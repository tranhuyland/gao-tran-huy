/**
 * ============================================================
 * GOOGLE APPS SCRIPT — Gạo Trần Huy CMS Webhook
 * ============================================================
 *
 * HƯỚNG DẪN CÀI ĐẶT:
 *
 * 1. Mở Google Sheet: https://docs.google.com/spreadsheets/d/10562yhbthC7zs9mEFkBo0Ly-8ul8Nkaf2hbJwBFTWXA/edit
 *
 * 2. Menu: Extensions → Apps Script (Mở rộng → Apps Script)
 *
 * 3. Xóa toàn bộ code cũ trong trình soạn thảo,
 *    copy và dán toàn bộ code bên dưới vào.
 *
 * 4. Nhấn nút "Deploy" (Triển khai) → "New deployment" (Triển khai mới)
 *
 * 5. Chọn type: "Web app"
 *    - Execute as: Me (your email)
 *    - Who has access: Anyone (Bất kỳ ai)
 *
 * 6. Copy URL (Webhook URL) được tạo ra.
 *
 * 7. Dán URL đó vào ô "Webhook Apps Script" trên trang /admin
 *    của website và nhấn "Lưu".
 *
 * 8. Xong! Khi bạn Thêm/Sửa/Xóa trên web, Google Sheet sẽ tự cập nhật.
 *
 * ============================================================
 */

// Tên các sheet tab
var SHEET_SP = "sp";
var SHEET_BLOG = "blog";

// Header columns cho sheet "sp"
var SP_HEADERS = [
  "id", "name", "slug", "category", "categorySlug",
  "price", "oldPrice", "unit", "origin",
  "shortDescription", "description", "image",
  "rating", "sold", "inStock", "isFeatured", "isBestSeller", "tags"
];

// Header columns cho sheet "blog"
var BLOG_HEADERS = [
  "id", "title", "slug", "excerpt", "content",
  "image", "category", "author", "date", "readTime"
];

function doGet() {
  return ContentService.createTextOutput(JSON.stringify({ status: "ok", message: "Gạo Trần Huy CMS Webhook is running" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);
    var action = body.action;   // "add", "update", "delete"
    var sheetName = body.sheet; // "sp" or "blog"
    var data = body.data;

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(sheetName);

    if (!sheet) {
      return jsonOut({ status: "error", message: "Sheet not found: " + sheetName });
    }

    var headers = sheetName === SHEET_SP ? SP_HEADERS : BLOG_HEADERS;

    // Ensure header row exists
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);
    }

    if (action === "add") {
      var row = headers.map(function(h) {
        return data[h] !== undefined ? data[h] : "";
      });
      sheet.appendRow(row);
      return jsonOut({ status: "ok", action: "add" });
    }

    if (action === "update") {
      var rowIndex = findRowById(sheet, headers, data.id);
      if (rowIndex > 0) {
        var updatedRow = headers.map(function(h) {
          return data[h] !== undefined ? data[h] : "";
        });
        sheet.getRange(rowIndex, 1, 1, headers.length).setValues([updatedRow]);
        return jsonOut({ status: "ok", action: "update" });
      }
      // If not found, add as new
      var newRow = headers.map(function(h) {
        return data[h] !== undefined ? data[h] : "";
      });
      sheet.appendRow(newRow);
      return jsonOut({ status: "ok", action: "add (fallback)" });
    }

    if (action === "delete") {
      var delRowIndex = findRowById(sheet, headers, data.id);
      if (delRowIndex > 0) {
        sheet.deleteRow(delRowIndex);
        return jsonOut({ status: "ok", action: "delete" });
      }
      return jsonOut({ status: "error", message: "ID not found: " + data.id });
    }

    return jsonOut({ status: "error", message: "Unknown action: " + action });
  } catch (err) {
    return jsonOut({ status: "error", message: String(err) });
  }
}

function findRowById(sheet, headers, id) {
  var data = sheet.getDataRange().getValues();
  var idCol = headers.indexOf("id");
  if (idCol < 0) return -1;
  for (var i = 1; i < data.length; i++) { // skip header row
    if (String(data[i][idCol]) === String(id)) {
      return i + 1; // 1-based row index
    }
  }
  return -1;
}

function jsonOut(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
