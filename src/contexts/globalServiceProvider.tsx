import React from "react";

import { AccountProvider } from "./accountContext";
import { AzureProvider } from "./azureContext";
import { CommunityProvider } from "./communityContext";
import { MeetupProvider } from "./meetupContext";
import { TokenProvider } from "./tokenContext";

type GlobalServiceProviderProps = {
  children: React.ReactNode;
};

export default function GlobalServiceProvider({
  children,
}: GlobalServiceProviderProps) {
  return (
    <AzureProvider>
      <TokenProvider>
        <AccountProvider>
          <CommunityProvider>
            <MeetupProvider>
              {children}
            </MeetupProvider>
          </CommunityProvider>
        </AccountProvider>
      </TokenProvider>
    </AzureProvider>
  );
}
