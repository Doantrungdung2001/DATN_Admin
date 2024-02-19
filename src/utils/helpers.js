export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function formatDate(inputDate) {
  // Tạo một đối tượng Date từ chuỗi đầu vào
  const date = new Date(inputDate)

  // Lấy ngày, tháng và năm từ đối tượng Date
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0') // Lưu ý rằng tháng bắt đầu từ 0
  const year = date.getFullYear()

  // Tạo chuỗi định dạng "dd/mm/yyyy"
  const formattedDate = `${day}/${month}/${year}`

  return formattedDate
}

export function formatDateTime(inputDateTime) {
  // Tạo một đối tượng Date từ chuỗi đầu vào
  const date = new Date(inputDateTime)

  // Lấy ngày, tháng, năm, giờ và phút từ đối tượng Date
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0') // Lưu ý rằng tháng bắt đầu từ 0
  const year = date.getFullYear()
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')

  // Tạo chuỗi định dạng "dd/mm/yyyy giờ:phút"
  const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}`

  return formattedDateTime
}

export function formatDateToInput(dateTime) {
  const dateObj = new Date(dateTime)

  const yearData = dateObj.getFullYear()
  const monthData = (dateObj.getMonth() + 1).toString().padStart(2, '0')
  const dateData = dateObj.getDate().toString().padStart(2, '0')

  const formattedDate = `${yearData}-${monthData}-${dateData}`

  return formattedDate
}
