import {Await, useLoaderData} from "react-router-dom";
import styles from "../../pages/Menu/Menu.module.css";
import {ProductInterface} from "../../interfaces/product.interface.ts";
import Heading from "../Heading/Heading.tsx";

export function Product() {
    const data = useLoaderData() as { data: ProductInterface };

    return <>
            <Await resolve={data.data}>
                {({data}: {data: ProductInterface}) => (
                        <>
                            <div className={styles['head']}>
                                <Heading>{data.name}</Heading>
                            </div>
                            <div className={styles['cards']}>
                            </div>
                        </>
                )}
            </Await>
    </>;
}