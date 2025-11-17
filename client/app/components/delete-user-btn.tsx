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
import { Trash2 } from 'lucide-react'
import { useCrudUser } from '../hooks/use-crud-user'

export function DeleteUserBtn({ userId }: { userId: number }) {
  const { deleteUser } = useCrudUser()

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='destructive' size='sm' className='hover:cursor-pointer'>
          <Trash2 className='w-4 h-4' />
          Xóa
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
            <Button
              size='sm'
              onClick={() => deleteUser(userId)}
              className='bg-red-500 hover:bg-red-600 focus:bg-red-600'
            >
              <Trash2 className='w-4 h-4' />
              Xóa
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
