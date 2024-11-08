import Heading from "../../components/Heading/Heading.tsx";
import styles from './Menu.module.css';
import { PREFIX } from "../../helpers/API.ts";
import { useEffect, useState } from "react";
import { ProductInterface } from "../../interfaces/product.interface.ts";
import axios, { AxiosError } from "axios";
import { MenuList } from "./MenuList/MenuList.tsx";
import { useSearch } from "@/context/SearchContext.tsx";
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog";
import Button from "@/components/Button/Button.tsx";

export function Menu() {
    const { filter } = useSearch();
    const [products, setProducts] = useState<ProductInterface[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>();
    const [selectedProduct, setSelectedProduct] = useState<ProductInterface | null>();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        getMenu(filter);
    }, [filter]);

    const getMenu = async (name?: string) => {
        try {
            setIsLoading(true);
            await new Promise<void>((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 0);
            });

            const { data } = await axios.get<ProductInterface[]>(`${PREFIX}/products`, {
                params: {
                    name,
                },
            });
            setProducts(data);
            setIsLoading(false);
        } catch (e) {
            console.error('Error fetching menu:', e);
            if (e instanceof AxiosError) {
                setError(e.message);
            } else {
                setError('An unexpected error occurred');
            }
            setIsLoading(false);
            return;
        }
    };

    const ingredients = selectedProduct?.ingredients.map((ingredient) => {
        return (
            <p key={ingredient} className="text-xl text-primary-body font-primaryRegular">
              • {ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}
            </p>
        );
    });

    const openDialog = (product: ProductInterface) => {
        setSelectedProduct(product);
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setSelectedProduct(null);
    };


    return (
        <>
            <div className={styles['head']}>
                <Heading>Меню</Heading>
            </div>
            <div className={styles['cards']}>
                {error && <>{error}</>}
                {products.length > 0 && (
                    <MenuList products={products} onCardClick={openDialog} />
                )}
                {isLoading && <>Загружаем продукты...</>}
                {products.length === 0 && <>Не найдено блюд по запросу</>}
            </div>

            <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
                <DialogContent className='p-0'>
                    {selectedProduct && (
                            <div className='rounded-[40px] lg:h-[535px] h-[435px] bg-center bg-no-repeat bg-cover'
                                 style={{backgroundImage: `url('${selectedProduct.image}')`}}>
                            </div>
                    )}
                    <div className="flex justify-between flex-col description p-5 gap-y-12">
                        <div className={styles['card-item__info']}>
                            <div className={styles['title']}>
                                {selectedProduct?.name}
                            </div>
                            <div className={styles["description"]}>
                                <span>СОСТАВ: </span>
                                {ingredients}
                            </div>
                        </div>
                        <Button appearance={'accent'} className='outline-none'>
                        В КОРЗИНУ
                            <img src="/bag-icon.svg" alt="bag"/>
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default Menu;