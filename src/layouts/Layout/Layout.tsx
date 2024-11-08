import { Outlet, useNavigate } from "react-router-dom";
import styles from './Layout.module.css';
import SearchInput from "../../components/SearchInput/SearchInput.tsx";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSearch } from '../../context/SearchContext.tsx';
import {
    Drawer,
    DrawerContent, DrawerDescription, DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import {useProfile} from "@/hooks/useProfile.ts";
import MenuButtons from "@/components/MenuButtons/MenuButtons.tsx";
import {AppDispatch, RootState} from "@/store/store.ts";
import {userActions} from "@/store/user.slice.ts";


export function Layout() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const profile = useProfile();
    const items = useSelector((s: RootState) => s.cart.items);
    const { updateFilter } = useSearch();

    const logout = () => {
        dispatch(userActions.logout());
        navigate('/auth/login');
    };

    const totalItemsCount = items.reduce((acc, item) => acc + item.count, 0);

    return (
        <>
            <div className={styles['layout']}>
                <div className={styles['header']}>
                    <div className={styles['menu']}>
                        <img className={styles['logo']} src="/Pizza.svg" alt="Logo" />
                        <SearchInput placeholder='Пицца пепперони...' onChange={updateFilter} />
                    </div>
                    <div className={styles['menu']}>
                        <div className={styles['buttons-group-2']}>
                            <MenuButtons totalItemsCount={totalItemsCount} />
                        </div>

                        <div className={styles['user']}>
                            <Drawer direction='right'>
                                <DrawerTrigger className='lg:hidden flex'>
                                    <Avatar className='cursor-pointer'>
                                        <AvatarImage src="./Avatar.png" />
                                        <AvatarFallback>Avatar</AvatarFallback>
                                    </Avatar>
                                </DrawerTrigger>
                                <DrawerContent>
                                    <DrawerHeader>
                                        <Avatar className='cursor-pointer'>
                                            <AvatarImage src="./Avatar.png" />
                                            <AvatarFallback>Avatar</AvatarFallback>
                                        </Avatar>
                                        <div className="gap-y-1 flex flex-col">
                                            <DrawerTitle>{profile?.name}</DrawerTitle>
                                            <DrawerDescription>{profile?.email}</DrawerDescription>
                                        </div>
                                    </DrawerHeader>
                                    <hr />
                                    <div className={styles['buttons-group']}>
                                        <MenuButtons totalItemsCount={totalItemsCount} />
                                    </div>
                                    <DrawerFooter>
                                        <button onClick={logout} className="flex items-center">
                                            Выйти <img src="/icon-door-exit.svg" alt="exit" className="ml-2" />
                                        </button>
                                    </DrawerFooter>
                                </DrawerContent>
                            </Drawer>

                            <div className="hidden lg:block">
                                <DropdownMenu>
                                    <DropdownMenuTrigger className='outline-none'>
                                        <Avatar className='cursor-pointer'>
                                            <AvatarImage src="./Avatar.png" />
                                            <AvatarFallback>Avatar</AvatarFallback>
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <div className="flex flex-col px-4">
                                            <DropdownMenuLabel>{profile?.name}</DropdownMenuLabel>
                                            <DropdownMenuLabel className='font-normal text-base'>{profile?.email}</DropdownMenuLabel>
                                        </div>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={logout}>
                                            Выйти
                                            <img src="/icon-door-exit.svg" alt="exit" />
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Outlet />
            </div>
        </>
    );
}