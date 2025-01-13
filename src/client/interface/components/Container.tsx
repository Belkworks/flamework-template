import React, { FC, InstanceProps } from "@rbxts/react";

type Props = InstanceProps<Frame>;

export const Container: FC<Props> = props => <frame AutomaticSize="XY" BackgroundTransparency={1} {...props} />;
