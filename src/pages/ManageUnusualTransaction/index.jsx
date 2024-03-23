import React, { useState } from 'react'
import Web3 from 'web3'

const ManageUnusualTransaction = () => {
  const [wallets, setWallets] = useState([
    '0xD332Daf3175779a95e620005125DC252f9933cE4',
    '0x69943D6a4dec8355789a143D230915C8B0B86A14'
  ]) // Danh sách các ví
  const [startTime, setStartTime] = useState('2022-01-01T00:00:00.000Z') // Mốc thời gian bắt đầu
  const eventTopics = [
    '0xa7f8f582d090b5312bbe3d5f616508e184319e9e0f3824445f07745728304c5f',
    '0x86ca012eeec5179616b871b1e8eac5e98a1abb80d429d200ae965170463ba85f',
    '0x67c7b818c4a6649026cffd6fa5216819bcb4a5f1ce495e4b9b5aecb73bed54d7',
    '0x5d22b2c17f9c0779c52f956eb23d2080eefebdf90ac9873b3c9d9e08c52b0d9d',
    '0xf98fb96e12314e75bed7f8fa15959c9227cbdb7aa8774dc674ebe16c3780b7e8',
    '0xd6e26280f779e80f6b6156ad164395e84a85d1f3ec41c70adb37cf41e743a2eb',
    '0x2e8e85ac143af4ef00d5b2faf8dbf69ab450d72e9ac6f2f4236b818e2a0631ff'
  ]

  const web3 = new Web3('https://evmos-pokt.nodies.app') // Thay thế bằng URL RPC của mạng Evmos
  const handleScanTransactions = async () => {
    const transactionsWithoutEvent = [] // Mảng các giao dịch không chứa event

    for (let i = 0; i < wallets.length; i++) {
      const wallet = wallets[i]
      const transactions = await web3.eth.getTransactionsByAccount(wallet, startTime)

      for (let j = 0; j < transactions.length; j++) {
        const transaction = transactions[j]
        const containsEvent = await containsEventInTransaction(transaction, eventTopics)

        if (!containsEvent) {
          console.log('Transaction: ', transaction)
          transactionsWithoutEvent.push(transaction) // Thêm giao dịch vào mảng
        }
      }
    }

    // Gửi mảng các giao dịch không chứa event lên backend
    sendTransactionsToBackend(transactionsWithoutEvent)

    // Cập nhật mốc thời gian thành hiện tại
    setStartTime(new Date().toISOString())
  }

  // Phương thức kiểm tra xem một giao dịch có chứa event hay không
  const containsEventInTransaction = async (transaction, eventTopics) => {
    try {
      const receipt = await web3.eth.getTransactionReceipt(transaction.hash)
      if (!receipt) {
        console.error('Transaction receipt not found')
        return false
      }

      // Duyệt qua logs của giao dịch để kiểm tra xem có event nào không
      for (let i = 0; i < receipt.logs.length; i++) {
        const log = receipt.logs[i]
        // Kiểm tra log có khớp với các topic của event mà bạn quan tâm
        if (eventTopics.includes(log.topics[0])) {
          // Log này chứa một trong các event mà bạn quan tâm
          return true
        }
      }

      // Không tìm thấy event trong logs của giao dịch
      return false
    } catch (error) {
      console.error('Error checking event in transaction:', error)
      return false
    }
  }

  // Phương thức gửi mảng các giao dịch không chứa event lên backend
  const sendTransactionsToBackend = async (transactions) => {
    try {
      // Gửi mảng transactions lên backend thông qua API
      console.log('Sending transactions to backend:', transactions)
    } catch (error) {
      console.error('Error sending transactions to backend:', error)
    }
  }

  return (
    <div>
      <button onClick={handleScanTransactions}>Scan Transactions</button>
    </div>
  )
}

export default ManageUnusualTransaction
