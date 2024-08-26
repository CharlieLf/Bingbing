import { canisterId as userCanisterId, idlFactory as userIdlFactory, user } from "@declarations/user";
import { canisterId as tokenCanisterId, idlFactory as tokenIdlFactory, token } from "@declarations/token";
import { canisterId as productCanisterId, idlFactory as productIdlFactory, product } from "@declarations/product";
import { canisterId as cartCanisterId, idlFactory as cartIdlFactory, cart } from "@declarations/cart";

import { _SERVICE as _SERVICE_USER } from "@declarations/user/user.did";
import { _SERVICE as _SERVICE_TOKEN } from "@declarations/token/token.did";
import { _SERVICE as _SERVICE_PRODUCT } from "@declarations/product/product.did";
import { _SERVICE as _SERVICE_CART } from "@declarations/cart/cart.did";

import { createReactor, useAgentManager } from "@ic-reactor/react";
import { ActorSubclass, CreateReactorReturnType } from "@ic-reactor/react/dist/types";
import { createContext, useEffect, useMemo, useState } from "react";

interface Props {
    children: React.ReactNode;
}

type ServiceType = {
    userService: CreateReactorReturnType<ActorSubclass<_SERVICE_USER>>;
    tokenService: CreateReactorReturnType<ActorSubclass<_SERVICE_TOKEN>>;
    productService: CreateReactorReturnType<ActorSubclass<_SERVICE_PRODUCT>>;
    cartService: CreateReactorReturnType<ActorSubclass<_SERVICE_CART>>;
    authenticating: boolean;
};

const ServiceContext = createContext<ServiceType | undefined>(undefined);

const ServiceContextProvider: React.FC<Props> = ({ children }) => {
    const agentManager = useAgentManager();
    const [authenticating, setAuthenticating] = useState(true);

    useEffect(() => {
        const unsubscribe = agentManager.subscribeAuthState((authState) => {
            if (authState.authenticating) {
                setAuthenticating(true);
            } else {
                setAuthenticating(false);
            }
        });

        return () => {
            unsubscribe();
        };
    }, [agentManager]);

    const userService = useMemo(() => createReactor<typeof user>({
        canisterId: userCanisterId,
        idlFactory: userIdlFactory,
        agentManager
    }), [agentManager]);

    const tokenService = useMemo(() => createReactor<typeof token>({
        canisterId: tokenCanisterId,
        idlFactory: tokenIdlFactory,
        agentManager
    }), [agentManager]);

    const productService = useMemo(() => createReactor<typeof product>({
        canisterId: productCanisterId,
        idlFactory: productIdlFactory,
        agentManager
    }), [agentManager]);

    const cartService = useMemo(() => createReactor<typeof cart>({
        canisterId: cartCanisterId,
        idlFactory: cartIdlFactory,
        agentManager
    }), [agentManager]);

    return (
        <ServiceContext.Provider value={{ userService, tokenService, productService, cartService, authenticating }}>
            {children}
        </ServiceContext.Provider>
    );
};

export { ServiceContextProvider };
export default ServiceContext;