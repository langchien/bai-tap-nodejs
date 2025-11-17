export enum STATUS_CODE {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  PAYLOAD_TOO_LARGE = 413,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
  UNPROCESSABLE_ENTITY = 422,
}

export const STATUS_MESSAGE: Record<STATUS_CODE, string> = {
  [STATUS_CODE.OK]: 'Thành công',
  [STATUS_CODE.CREATED]: 'Đã tạo',
  [STATUS_CODE.BAD_REQUEST]: 'Yêu cầu không hợp lệ',
  [STATUS_CODE.NO_CONTENT]: 'Không có nội dung',
  [STATUS_CODE.UNAUTHORIZED]: 'Chưa xác thực',
  [STATUS_CODE.FORBIDDEN]: 'Không có quyền truy cập',
  [STATUS_CODE.NOT_FOUND]: 'Không tìm thấy',
  [STATUS_CODE.CONFLICT]: 'Xung đột dữ liệu',
  [STATUS_CODE.TOO_MANY_REQUESTS]: 'Quá nhiều yêu cầu, vui lòng thử lại sau',
  [STATUS_CODE.PAYLOAD_TOO_LARGE]: 'Dữ liệu gửi lên quá lớn hoặc vượt quá số lượng cho phép',
  [STATUS_CODE.INTERNAL_SERVER_ERROR]: 'Lỗi máy chủ nội bộ',
  [STATUS_CODE.UNPROCESSABLE_ENTITY]: 'Dữ liệu từ body không hợp lệ',
}
