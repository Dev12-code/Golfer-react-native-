import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationService, navigationRef, navigate, changeStack } from "./NavigationService";


// Notification A to land on calendar screen
// Notification B to  land on tournament create rabbit card page 
// Notification C to land on Results page for that particular round
export const handleNavigation = async (data, isLogin) => {
  try {
    console.log('handleNavigation : data : ', data);
    await AsyncStorage.removeItem('notification');
    console.log("isLogin", isLogin);
    if (isLogin) {
      if (data.type == "A") {
        navigate("ChooseDates");
      }
      else if (data.type == "B") {
        navigate("CreateRabbitCards");
      }
      else if (data.type == "C") {
        // navigate("SummaryPlayed",);
        // const cardString = JSON.stringify(data.card);
        const cardJson = JSON.parse(data.card);
        // local notification : string
        // opened notification : string
        // killed notification : string
        console.log("cardJson",cardJson);

        navigate("SummaryPlayed", {
          card: cardJson
        })

      }
      // else if (data.type == "6") {
      //   navigate(ScreenName.SinglePropertyScreen, {
      //     propertyID: data.id,
      //   });
      // }
      // else if (data.type == "9") {
      //   navigate(ScreenName.MyListingViewBid, {
      //     paramKey: data.id,
      //   });
      // }
      // else if (data.type == "10") {
      //   navigate(ScreenName.SinglePropertyScreen, {
      //     propertyID: data.id,
      //   });
      // }

      // else if (data.type == "12") {
      //   navigate(ScreenName.SinglePropertyScreen, {
      //     propertyID: data.id,
      //   });
      // }
      // else {
      //   changeStack("AuthStack");
      // }
    } else {
      // changeStack("AuthStack");
    }

  } catch (e) {
    alert(e);
  }
}
export const getDisplayNameFromFieldName = (name) => {
  switch (name) {
    case 'new_password1':
      return 'password';
    case 'new_password2':
      return 'password';
    case 'last_name':
      return 'last name';
    default:
      return name;
  }
};

export const getServerError = (errorObject, errorMessage) => {
  if (errorObject) {
    try {
      if (typeof errorObject === 'string') {
        return errorObject;
      }

      const fields = Object.keys(errorObject);
      const messages = [];

      fields.forEach((fieldName) => {
        const message = errorObject[fieldName];
        if (fieldName === 'non_field_errors') {
          if (typeof message === 'string') {
            messages.push(`${message}`);
          } else if (typeof message === 'object') {
            const messageContentData = Object.values(message);
            const messageContent = messageContentData && messageContentData[0];

            messages.push(`${messageContent}`);
          }
        } else {
          const displayName = getDisplayNameFromFieldName(fieldName);
          if (typeof message === 'string') {
            messages.push(
              !Number.isNaN(Number(displayName))
                ? message
                : `${message} (${displayName})`,
            );
          } else if (typeof message === 'object') {
            const messageContentData = Object.values(message);
            const messageContent = messageContentData && messageContentData[0];

            messages.push(
              !Number.isNaN(Number(displayName))
                ? messageContent
                : `${messageContent} (${displayName})`,
            );
          }
        }
      });

      return messages.join(' ~ ');
    } catch (e) {
      return errorMessage;
    }
  }

  return null;
};

export const regex = {
  email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  password: /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/
}
