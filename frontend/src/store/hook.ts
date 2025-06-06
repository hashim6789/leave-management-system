import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from ".";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = () => useSelector((state: RootState) => state);
