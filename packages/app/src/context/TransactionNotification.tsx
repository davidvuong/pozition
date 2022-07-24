import { useState, memo } from "react";
import React from "react";

export interface NotificationValues {
  show: boolean;
  transactionHash: string;
  showNotification: (transactionId: string) => void;
  hideNotification: () => void;
}

const iniitalNotificationValues: NotificationValues = {
  show: false,
  transactionHash: "",
  showNotification: (transactionHash: string) => {},
  hideNotification: () => {},
};

export const TransactionNotificationContext =
  React.createContext<NotificationValues>(iniitalNotificationValues);

export const TransactionNotificationContextProvider = memo(
  ({ children }: { children: React.ReactNode }) => {
    const showNotification = (transactionHash: string) => {
      setState((prevState: NotificationValues) => ({
        ...prevState,
        show: true,
        transactionHash,
      }));
      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          show: false,
          transactionHash: "",
        }));
      }, 5000);
    };

    const hideNotification = () => setState(() => iniitalNotificationValues);

    // TODO: In all honesty, this is a pretty gross way of doing this. There's probably a better approach.
    //
    // Types aren't inferred properly and redefinition 2 times over is super tedious. It also risks forgetting
    // to override the default function below.
    const [state, setState] = useState<NotificationValues>({
      ...iniitalNotificationValues,
      showNotification,
      hideNotification,
    });

    return (
      <TransactionNotificationContext.Provider value={state}>
        {children}
      </TransactionNotificationContext.Provider>
    );
  }
);
