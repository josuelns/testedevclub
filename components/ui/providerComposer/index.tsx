import React, { ReactNode, FC } from "react";

type ProviderProps = {
  children: ReactNode;
};

type Provider = {
  component: React.ComponentType<ProviderProps>;
};

const ProviderComposer: FC<{ providers: Provider[]; children: ReactNode }> = ({
  providers,
  children,
}) => {
  return providers.reduceRight((acc, { component: ProviderComponent }) => {
    return <ProviderComponent>{acc}</ProviderComponent>;
  }, children);
};

export default ProviderComposer;