import { notifications } from "@mantine/notifications";

export const fetchWithNotification = async ({
    url,
    onSuccess,
    onError,
    errorTitle = "Error",
    errorMessage = "Failed to fetch data",
}) => {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        if (!response.ok) {
            const errorData = await response.json();
            notifications.show({
                title: errorTitle,
                message: errorData.message || errorMessage,
                color: "red",
            });

            if (onError) onError(errorData);
            return;
        }

        const result = await response.json();
        if (onSuccess) onSuccess(result.data);
    } catch (error) {
        console.error("Network/server error:", error.message);
        notifications.show({
            title: errorTitle,
            message: errorMessage,
            color: "red",
        });
        if (onError) onError(error);
    }
};
