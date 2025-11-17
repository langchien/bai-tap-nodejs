import { userRequest } from '@/api-request/user/user.request'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useRequest } from '@/hooks/use-request'
import { Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router'

export function DeleteUserBtn({ userId }: { userId: string }) {
  const navigate = useNavigate()
  const onDelete = useRequest(() => userRequest.deleteById(userId), {
    messageSuccess: 'Xoá người dùng thành công',
    onSuccess: () => navigate('/'),
  })

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='ghost' size='icon-lg'>
          <Trash2 className='w-4 h-4 text-red-500' />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bạn chắc chắn chứ!</AlertDialogTitle>
          <AlertDialogDescription>
            Hành động này không thể hoàn tác. Người dùng sẽ bị xóa vĩnh viễn.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={onDelete} className='bg-red-500 hover:bg-red-600 focus:bg-red-600'>
              <Trash2 className='w-4 h-4' />
              Xóa
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
