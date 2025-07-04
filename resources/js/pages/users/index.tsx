import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import AppLayout from '@/layouts/app-layout'
import { format } from '@/lib/date-utils'
import type { BreadcrumbItem, User } from '@/types'
import { Head } from '@inertiajs/react'
import { useLaravelReactI18n } from 'laravel-react-i18n'

export default function Users({ users = [] }: { users?: User[] }) {
  // Setup translations
  const { currentLocale, t, tChoice } = useLaravelReactI18n()

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: t('Dashboard'),
      href: route('dashboard')
    },
    {
      title: tChoice('User', 2),
      href: route('users.index')
    }
  ]

  // @TODO use data table

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={tChoice('Project', 2)} />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl px-4 md:px-0">
        <Table>
          <TableCaption>{t('A list of all registered users.')}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>{t('Name')}</TableHead>
              <TableHead>{t('Email')}</TableHead>
              <TableHead>{t('Registration date')}</TableHead>
              <TableHead>{t('Verification date')}</TableHead>
              <TableHead>{t('Last update')}</TableHead>
              <TableHead>{t('Proj. #')}</TableHead>
              <TableHead>{t('Permissions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{format(user.created_at, currentLocale())}</TableCell>
                <TableCell>
                  {user.email_verified_at ? format(user.email_verified_at, currentLocale()) : t('pending')}
                </TableCell>
                <TableCell>{format(user.updated_at, currentLocale())}</TableCell>
                <TableCell>{user.projects?.length || 0}</TableCell>
                <TableCell>
                  {user.permissions?.map((permission) => (
                    <Badge
                      variant="outline"
                      className="mr-1 px-1 font-normal last:mr-0"
                    >
                      {permission.label}
                    </Badge>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AppLayout>
  )
}
