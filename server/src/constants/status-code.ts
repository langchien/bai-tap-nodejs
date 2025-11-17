export const STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  PAYLOAD_TOO_LARGE: 413,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  UNPROCESSABLE_ENTITY: 422,
} as const

export const STATUS_MESSAGE: Record<keyof typeof STATUS_CODE, string> = {
  OK: 'Thành công',
  CREATED: 'Đã tạo',
  BAD_REQUEST: 'Yêu cầu không hợp lệ',
  NO_CONTENT: 'Không có nội dung',
  UNAUTHORIZED: 'Chưa xác thực',
  FORBIDDEN: 'Không có quyền truy cập',
  NOT_FOUND: 'Không tìm thấy',
  CONFLICT: 'Xung đột dữ liệu',
  TOO_MANY_REQUESTS: 'Quá nhiều yêu cầu, vui lòng thử lại sau',
  PAYLOAD_TOO_LARGE: 'Dữ liệu gửi lên quá lớn hoặc vượt quá số lượng cho phép',
  INTERNAL_SERVER_ERROR: 'Lỗi máy chủ nội bộ',
  UNPROCESSABLE_ENTITY: 'Dữ liệu từ body không hợp lệ',
} as const
