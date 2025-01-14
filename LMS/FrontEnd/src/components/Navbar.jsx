import {
  LayoutDashboard, School,
  BookOpen,
  Edit,
  LogOut,
  BookOpenText,
  Menu
} from 'lucide-react'
import React, { useEffect } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenuGroup, Separator } from '@radix-ui/react-dropdown-menu'
import { Link, useNavigate } from 'react-router'
import { Button } from './ui/button'
import { DarkMode } from '@/DarkMode'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useLogoutUserMutation } from '@/features/api/authApi'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'


const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);

  const [logoutUser, { data, isSuccess, error }, refetch] = useLogoutUserMutation();

  const handleLogout = async () => {
    await logoutUser();
  }

  useEffect(() => {
    if (data && isSuccess) {
      navigate('/')
      toast.success(data?.message || "User logged out")
    }
    if (error) {
      toast.error(error?.data.message || "Failed to log out")
    }
  }, [isSuccess, error])

  return (
    <div className="h-16 dark:bg-[#020817] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">

      {/* Desktop */}
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full px-4">
        <div className="flex items-center gap-2">
          {/* <School size={30} /> */}
          <BookOpenText size={25} className='mt-1' />
          <Link to="/">
            <h1 className="hidden md:block font-extrabold text-2xl">
              E-Learning
            </h1>
          </Link>
        </div>

        <div className='flex gap-4'>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.avatar.url || "https://github.com/shadcn.png"} />
                  <AvatarFallback>{user?.name}</AvatarFallback>
                </Avatar>

              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link to="my-learning" className="flex items-center gap-2">
                      <BookOpen size={16} /> My Learning
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="profile" className="flex items-center gap-2">
                      <Edit size={16} /> Edit Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2" onClick={handleLogout}>
                    <LogOut size={16} /> Log Out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                {user?.role === "instructor" && (
                  <>
                  <DropdownMenuSeparator />
                    <DropdownMenuSeparator />
                    <DropdownMenuItem><Link to="/admin/dashboard">Dashboard</Link></DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

          ) : (
            <div className="flex items-center gap-2">
              <Link to={"/login"}>
                <Button variant="outline">
                  Login
                </Button>
              </Link>
              <Link to="/signup"><Button >Signup</Button></Link>
            </div>
          )}

          <DarkMode />
        </div>
      </div>

      {/* Mobile Device */}
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <h1 className="font-extrabold text-2xl flex justify-center items-center gap-2"><BookOpenText size={20} className='mt-1' />E-learning</h1>
        <MobileNavbar user={user} />
      </div>
    </div>
  )
}

export default Navbar



const MobileNavbar = (user) => {
  const navigate = useNavigate();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="rounded-full hover:bg-gray-200"
          variant="outline"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle> <Link to="/">E-Learning</Link></SheetTitle>
          <DarkMode />
        </SheetHeader>
        <Separator className="mr-2" />
        <nav className="flex flex-col space-y-4">
          <Link to="/my-learning">My Learning</Link>
          <Link to="/profile">Edit Profile</Link>
          <p>Log out</p>
        </nav>
        {user?.role === "instructor" && (
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit" onClick={() => navigate("/admin/dashboard")}>Dashboard</Button>
            </SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};
