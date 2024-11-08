import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {AppDispatch, RootState} from "@/store/store.ts";
import {getProfile} from "@/store/user.slice.ts";

export const useProfile = () => {
    const dispatch = useDispatch<AppDispatch>();
    const profile = useSelector((state: RootState) => state.user.profile);

    useEffect(() => {
        dispatch(getProfile());
    }, [dispatch]);

    return profile;
};