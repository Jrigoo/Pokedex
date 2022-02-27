import React from "react";
import { mainContext } from "../context/MainContext";

export const useAuth = () => React.useContext(mainContext);

