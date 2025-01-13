import React, { FC, InstanceProps } from "@rbxts/react";

type Props = InstanceProps<ScreenGui>;

export const Layer: FC<Props> = props => <screengui ResetOnSpawn={false} {...props} />;
