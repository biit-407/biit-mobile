import React from "react";

import { AccountProvider } from "./accountContext";
import { AzureProvider } from "./azureContext";
import { CommunityProvider } from "./communityContext";
import { MeetupProvider } from "./meetupContext";
import { NotificationCenterProvider } from "./notificationCenterContext";
import { SnackbarProvider } from "./snackbarContext";
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
              <SnackbarProvider>
                <NotificationCenterProvider>
                  {children}
                </NotificationCenterProvider>
              </SnackbarProvider>
            </MeetupProvider>
          </CommunityProvider>
        </AccountProvider>
      </TokenProvider>
    </AzureProvider>
  );
}
