import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Edit2 } from 'lucide-react'
import { toast } from 'sonner'
import { useCrudUser } from '../hooks/use-crud-user'
import { DeleteUserBtn } from './delete-user-btn'
import type { UserStatus } from './schema'

export const StatusBadge = ({ status }: { status: UserStatus }) => {
  return status === 'active' ? (
    <Badge className='bg-green-100 text-green-800 hover:bg-green-100'>Hoạt Động</Badge>
  ) : (
    <Badge className='bg-gray-100 text-gray-800 hover:bg-gray-100'>Không Hoạt Động</Badge>
  )
}

export default function ResultTable() {
  const { users, status, deleteUser, searchQuery } = useCrudUser()
  const resultUsers = users
    .filter((user) => {
      if (status === 'all') return true
      return user.status === status
    })
    .filter((user) => {
      if (!searchQuery) return true
      const query = searchQuery.toLowerCase()
      return (
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.phone.toLowerCase().includes(query)
      )
    })

  return (
    <>
      <div className='bg-card border border-border rounded-lg overflow-hidden'>
        <Table>
          <TableHeader className='bg-muted'>
            <TableRow>
              <TableHead className='text-card-foreground'>ID</TableHead>
              <TableHead className='text-card-foreground'>Tên</TableHead>
              <TableHead className='text-card-foreground'>Email</TableHead>
              <TableHead className='text-card-foreground'>Số Điện Thoại</TableHead>
              <TableHead className='text-card-foreground'>Trạng Thái</TableHead>
              <TableHead className='text-card-foreground'>Ngày Tạo</TableHead>
              <TableHead className='text-card-foreground text-right'>Hành Động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {resultUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className='text-center py-8 text-muted-foreground'>
                  Không có người dùng nào
                </TableCell>
              </TableRow>
            ) : (
              resultUsers.map((user) => (
                <TableRow key={user.id} className='hover:bg-muted/50'>
                  <TableCell className='font-medium'>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell className='text-sm text-muted-foreground'>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>
                    <StatusBadge status={user.status} />
                  </TableCell>
                  <TableCell className='text-sm text-muted-foreground'>{user.createdAt}</TableCell>
                  <TableCell className='text-right'>
                    <div className='flex items-center justify-end gap-2'>
                      <Button
                        size='sm'
                        onClick={() => toast.success('Chức năng sửa chưa được triển khai')}
                        className='hover:cursor-pointer bg-yellow-500 hover:bg-yellow-600 focus:bg-yellow-600'
                      >
                        <Edit2 className='w-4 h-4' />
                        Sửa
                      </Button>
                      <DeleteUserBtn userId={user.id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
