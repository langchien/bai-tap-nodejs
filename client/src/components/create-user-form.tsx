import {
  CreateUserReqBodySchema,
  type ICreateUserReqBodyDto,
} from '@/api-request/user/user.req.dto'
import { userRequest } from '@/api-request/user/user.request'
import { USER_STATUS } from '@/api-request/user/user.schema'
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
import { useRequest } from '@/hooks/use-request'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, UserIcon } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

export default function CreateUserForm() {
  const [open, setOpen] = useState(false)
  const form = useForm<ICreateUserReqBodyDto>({
    resolver: zodResolver(CreateUserReqBodySchema),
    defaultValues: {
      status: USER_STATUS.ACTIVE,
    },
  })
  const onRequest = useRequest(userRequest.create, {
    setError: form.setError,
    messageSuccess: 'Tạo người dùng thành công',
    onSuccess: () => {
      setOpen(false)
      form.reset({}, { keepDefaultValues: true })
    },
    redirectUrl: '/',
  })
  const onSubmit = form.handleSubmit(onRequest)

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
        <form id='form-rhf-demo' onSubmit={onSubmit}>
          <FieldGroup>
            <Controller
              name='username'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='username'>Tên đăng nhập</FieldLabel>
                  <Input
                    {...field}
                    id='username'
                    aria-invalid={fieldState.invalid}
                    placeholder='Nhập tên đăng nhập'
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
              name='displayName'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='displayName'>Tên hiển thị</FieldLabel>
                  <Input
                    {...field}
                    id='displayName'
                    aria-invalid={fieldState.invalid}
                    placeholder='Nhập tên hiển thị'
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name='phoneNumber'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='phoneNumber'>Số Điện Thoại (tùy chọn)</FieldLabel>
                  <Input
                    {...field}
                    id='phoneNumber'
                    aria-invalid={fieldState.invalid}
                    placeholder='Nhập số điện thoại'
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name='password'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='password'>Mật khẩu</FieldLabel>
                  <Input
                    {...field}
                    type='password'
                    id='password'
                    aria-invalid={fieldState.invalid}
                    placeholder='Nhập mật khẩu'
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
