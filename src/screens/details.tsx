import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { RootStackParamList } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;

export const DetailsScreen: React.FC<Props> = () => null