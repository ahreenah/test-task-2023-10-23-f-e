import {createContext, useContext} from "react";
import {container} from "./ioc";

const ContainerContext = createContext<typeof container>(container)

export default ContainerContext
export const ContainerProvider = ContainerContext.Provider
export const useContainer = () => useContext(ContainerContext)
