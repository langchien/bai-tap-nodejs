import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useCrudUser } from '@/hooks/use-crud-user'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, UserIcon } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { AddUserSchema, type IAddUser } from './schema'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

export default function AddUserForm() {
  const { addUser, users } = useCrudUser()
  const [open, setOpen] = useState(false)
  const form = useForm<IAddUser>({
    resolver: zodResolver(AddUserSchema),
    defaultValues: {
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
    },
  })
  function onSubmit(data: IAddUser) {
    const randomId = users.length + 1
    addUser({ ...data, id: randomId })
    toast.success('Thêm người dùng thành công')
    setOpen(false)
    form.reset({}, { keepDefaultValues: true })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='gap-2'>
          <Plus className='w-4 h-4' />
          Thêm Người Dùng
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <UserIcon className='w-5 h-5' />
            Thêm Người Dùng Mới
          </DialogTitle>
          <DialogDescription>Điền thông tin để tạo người dùng mới</DialogDescription>
        </DialogHeader>
        <form id='form-rhf-demo' onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name='name'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='name'>Tên</FieldLabel>
                  <Input
                    {...field}
                    id='name'
                    aria-invalid={fieldState.invalid}
                    placeholder='Nhập tên người dùng'
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name='email'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='email'>Email</FieldLabel>
                  <Input
                    type='email'
                    {...field}
                    id='email'
                    aria-invalid={fieldState.invalid}
                    placeholder='Nhập email'
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name='phone'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='phone'>Số Điện Thoại</FieldLabel>
                  <Input
                    {...field}
                    id='phone'
                    aria-invalid={fieldState.invalid}
                    placeholder='Nhập số điện thoại'
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name='status'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Trạng thái</FieldLabel>
                  <Select {...field} onValueChange={(e) => field.onChange(e)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='active'>Hoạt Động</SelectItem>
                      <SelectItem value='inactive'>Không Hoạt Động</SelectItem>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Button className='w-full'>
              <Plus className='w-4 h-4' />
              Thêm
            </Button>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  )
}
