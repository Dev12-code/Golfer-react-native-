import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationService, navigationRef, navigate, changeStack } from "./utils/NavigationService";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import Constants from 'expo-constants';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import * as Font from "expo-font";
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification, { Importance } from "react-native-push-notification";
import messaging from '@react-native-firebase/messaging';
import React, { useRef, useContext, useEffect, useState } from "react";
import { ActivityIndicator, LogBox, View, Image, StyleSheet, StatusBar ,Appearance, Alert} from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Provider, useDispatch, useSelector } from "react-redux";
import ChooseDates from "./Modules/ChooseDates";
import CompeteTournamentSelection from "./Modules/CompeteTournamentSelection";
import CreateAccount from "./Modules/CreateAccount";
import CreateRabbitCards from "./Modules/CreateRabbitCards";
import ForgotPassword from "./Modules/ForgotPassword";
import MyRabbitCards from "./Modules/MyRabbitCards";
import MyRabbitPurse from "./Modules/MyRabbitPurse";
import MyRabbitPurseShipping from "./Modules/MyRabbitPurseShipping";
import MyTournamentRanking from "./Modules/MyTournamentRanking";
import MyTournamentRankingProgress from "./Modules/MyTournamentRankingProgress";

import NoChoice from "./Modules/NoChoice";
import OverallRanking from "./Modules/OverallRanking";
import Paring from "./Modules/Paring";
import PlayerDirectory from "./Modules/PlayerDirectory";
import PlayerProfile from "./Modules/PlayerProfile";
import PlayerScreen from "./Modules/components/screens/PlayerScreen"
import PurseSponsors from "./Modules/PurseSponsors";
import RabbitCardReadyToPlay from "./Modules/RabbitCardReadyToPlay";
import RabbitCardReadyToPlaySummary from "./Modules/RabbitCardReadyToPlaySummary";
import RabbitCardSummaryInProgress from "./Modules/RabbitCardSummaryInProgress";
import ReEnterEmail from "./Modules/ReEnterEmail";
import ResetPassword from "./Modules/ResetPassword";
import ResetTemporaryPassword from "./Modules/ResetTemporaryPassword";
import SentEmail from "./Modules/SentEmail";
import Sidebar from "./Modules/Sidebar";
import SignIn from "./Modules/SignIn";
import Introduce from "./Modules/Introduce";

import Sponsor from "./Modules/Sponsor";
import SponsorGalary from "./Modules/SponsorGalary";
import StartScreen from "./Modules/Start";
import { CommonColors, CommonStyles } from "./Modules/style";
import TestScreen from "./Modules/TestScreen";
import FAQScreen from "./Modules/FAQScreen";
import Tutorial from "./Modules/Tutorial";

import HeadToHead from "./Modules/HeadToHead";

import Thankyou from "./Modules/Thankyou";
import TieBreaker from "./Modules/TieBreaker";
import TournamentCalc from "./Modules/TournamentCalc";
import TournamentChoices from "./Modules/TournamentChoices";
import TournamentCountDown from "./Modules/TournamentCountDown";
import TournamentPushNotification from "./Modules/TournamentPushNotification";
import YouWin from "./Modules/YouWin";
import { store } from "./store";
import { getLoggedUser } from "./store/redux/auth/actions";
// import * as Notifications from 'expo-notifications';
import RabbitCardSummary from "./Modules/RabbitCardSummary";
import { handleNavigation } from "./utils/helpers";
import { Images } from "./common/Images";

LogBox.ignoreAllLogs();

import RabbitCardSummaryPlayed from "./Modules/RabbitCardSummary";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const RootStack = createStackNavigator();

const colorScheme = Appearance.getColorScheme();

const Root = () => {
  return (
    <Drawer.Navigator
      initialRouteName="MyRabbitCards"
      drawerContent={(props) => <Sidebar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="MyRabbitCards" component={MyRabbitCards} />
      <Drawer.Screen name="ChooseDates" component={ChooseDates} />
      <Drawer.Screen name="Sponsors" component={PurseSponsors} />
      <Drawer.Screen name="Directory" component={PlayerDirectory} />
      <Drawer.Screen name="OverallRankings" component={OverallRanking} />
      {/* <Drawer.Screen name="Rankings" component={MyTournamentRanking} /> */}
      <Drawer.Screen name="Account" component={ResetPassword} />
      <Drawer.Screen name="TestScreen" component={TestScreen} />
      <Drawer.Screen name="FAQs" component={FAQScreen} />
      <Drawer.Screen name="HeadToHead" component={HeadToHead} />
      <Drawer.Screen name="Tutorial" component={Tutorial} />

    </Drawer.Navigator>
  );
};

const intro = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}
      initialRouteName="Introduce"
    >
      <Stack.Screen name="Introduce" component={Introduce} />
    </Stack.Navigator>
  );
};

const Auth = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Create Account" component={CreateAccount} />
      <Stack.Screen name="Home" component={StartScreen} />
      <Stack.Screen name="Sign In" component={SignIn} />
      <Stack.Screen name="Forgot Password" component={ForgotPassword} />
      <Stack.Screen name="SentEmail" component={SentEmail} />
      <Stack.Screen name="ReEnterEmail" component={ReEnterEmail} />
      <Stack.Screen
        name="ResetTemporaryPassword"
        component={ResetTemporaryPassword}
      />
    </Stack.Navigator>
  );
};

const RootNavigator = () => {
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [fontsLoaded, setLoaded] = useState(false);
  const [splashLoaded, setSplashLoaded] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    PushNotificationIOS.addEventListener('notification', onRemoteNotification);
  });
  const onRemoteNotification = (notification) => {
    console.log("onRemoteNotification : ",notification)
    const isClicked = notification.getData().userInteraction === 1;

    if (isClicked) {
      // Navigate user to another screen
    } else {
      // Do something else with push notification
    }
  };

  PushNotification.configure({
    // // (optional) Called when Token is generated (iOS and Android)
    // onRegister: function (token) {
    //   console.log("TOKEN:", token);
    // },
    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
      // process the notification
      // (required) Called when a remote is received or opened, or local notification is opened
      notification.finish(PushNotificationIOS.FetchResult.NoData);

      if(notification.userInteraction != undefined && notification.foreground != undefined){
        if(notification.userInteraction && notification.foreground){
        console.log("user clicked",notification);
        console.log("onClickLocalNotification:", notification.data);
        handleNavigation(notification.data,state.loggedIn);
        }
      }
    },
  
    // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    // onAction: function (notification) {
    //   console.log("ACTION:", notification.action);
    //   console.log("NOTIFICATION:", notification);
  
    //   // process the action
    // },
  
    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    // onRegistrationError: function(err) {
    //   console.error(err.message, err);
    // },
  
    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
  
    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,
  
    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     * - if you are not using remote notification or do not have Firebase installed, use this:
     *     requestPermissions: Platform.OS === 'ios'
     */
    requestPermissions: true,
  });

  useEffect(() => {
    
    setTimeout(
      function () {
        setSplashLoaded(true);
      }
        .bind(this),
      3000
    );
    notificationSetup();
  }, []);

  useEffect(()=>{
    console.log("useEffect---loggedIn : ",state.loggedIn)
    AsyncStorage.setItem('loggedIn', JSON.stringify(state.loggedIn))
    console.log("bbbbbb",state.Introduce);
  },[state.loggedIn]);

  
  useEffect(() => {
    getData();
  }, [splashLoaded]);

  const getData = () => {
    dispatch(getLoggedUser());
  }

  const notificationSetup = () => {
    // configAndroidIos();
    checkPermission();

    /*
    * Triggered when a particular notification has been received in foreground
    * */
    messaging().onMessage(async (remoteMessage) => {
      console.log('notification received : onMessage---1', JSON.stringify(remoteMessage));
      console.log('onMessage--1');
      if (Platform.OS == 'ios') {
        console.log('onMessage--2-3');
        try {
          var RandomNumber = '' + Math.floor(Math.random() * 100) + 1;
          console.log('onMessage--2-4');
         
          PushNotificationIOS.addNotificationRequest({
            // fireDate:new Date(),
            id: RandomNumber,
            title: remoteMessage.notification.title,
            // subtitle: A secondary description of the reason for the alert.
            body : remoteMessage.notification.body,
            // fireDate : The date and time when the system should deliver the notification.
            // repeats : Sets notification to repeat. Must be used with fireDate and repeatsComponent.
            // repeatsComponent: An object indicating which parts of fireDate should be repeated.
            // sound : The sound played when the notification is fired.
            // category : The category of this notification, required for actionable notifications.
            // isSilent : If true, the notification will appear without sound.
            // isCritical : If true, the notification sound be played even when the device is locked, muted, or has Do Not Disturb enabled.
            // criticalSoundVolume : A number between 0 and 1 for volume of critical notification. Default volume will be used if not specified.
            userInfo : remoteMessage.data
            // year: Will repeat every selected year in your fireDate.
            // month: Will repeat every selected month in your fireDate.
            // day: Will repeat every selected day in your fireDate.
            // dayOfWeek: Will repeat every selected day of the week in your fireDate.
            // hour: Will repeat every selected hour in your fireDate.
            // minute: Will repeat every selected minute in your fireDate.
            // second: Will repeat every selected second in your fireDate.
          });
          console.log('onMessage--2-5');
        } catch (e) {
          console.log('onMessage-3', e.message);
          console.log('onMessage-3', JSON.stringify(e));
        }

      } else {
        console.log('onMessage--4');

        try {
          console.log('onMessage--5');

          PushNotification.createChannel(
            {
              channelId: "app.theoffer", // (required)
              channelName: "OfferApp", // (required)
              channelDescription: "OfferApp", // (optional) default: undefined.
              playSound: false, // (optional) default: true
              soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
              importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
              vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
            },
            (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
          );
          var RandomNumber = '' + Math.floor(Math.random() * 100) + 1;
          console.log("Random-Notification-Id", RandomNumber)
          PushNotification.localNotification({
            id: RandomNumber, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
            /* Android Only Properties */
            channelId: "app.theoffer", // (required) channelId, if the channel doesn't exist, notification will not trigger.
            title: remoteMessage.notification.title, // (optional)
            message: remoteMessage.notification.body, // (required)
            smallIcon: "notification_icon", // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
            color: "#f28a23", // (optional) default: system defaultpriority: "high", // (optional) set notification priority, default: high
            visibility: "private", // (optional) set notification visibility, default: private
            ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear). should be used in combine with `com.dieam.reactnativepushnotification.notification_foreground` setting
            soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
            userInfo: remoteMessage.data, // (optional) default: {} (using null throws a JSON value '<null>' error)
            // ticker: "My Notification Ticker", // (optional)
            // showWhen: true, // (optional) default: true
            // autoCancel: true, // (optional) default: true
            // largeIcon: "notification_icon", // (optional) default: "ic_launcher". Use "" for no large icon.
            // largeIconUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined

            // bigText: "My big text that will be shown when notification is expanded. Styling can be done using HTML tags(see android docs for details)", // (optional) default: "message" prop
            // subText: "This is a subText", // (optional) default: none
            // bigPictureUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
            // bigLargeIcon: "ic_launcher", // (optional) default: undefined
            // bigLargeIconUrl: "https://www.example.tld/bigicon.jpg", // (optional) default: undefined

            // vibrate: true, // (optional) default: true
            // vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
            // tag: "some_tag", // (optional) add tag to message
            // group: "group", // (optional) add group to message
            // groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
            // ongoing: false, // (optional) set whether this is an "ongoing" notification

            // shortcutId: "shortcut-id", // (optional) If this notification is duplicative of a Launcher shortcut, sets the id of the shortcut, in case the Launcher wants to hide the shortcut, default undefined
            // onlyAlertOnce: false, // (optional) alert will open only once with sound and notify, default: false

            // when: null, // (optional) Add a timestamp (Unix timestamp value in milliseconds) pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
            // usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
            // timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null

            // messageId: "google:message_id", // (optional) added as `message_id` to intent extras so opening push notification can find data stored by @react-native-firebase/messaging module. 

            // actions: ["Yes", "No"], // (Android only) See the doc for notification actions to know more
            // invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true

            /* iOS only properties */
            // category: "", // (optional) default: empty string
            // subtitle: "My Notification Subtitle", // (optional) smaller title below notification title

            /* iOS and Android properties */


            // picture: "https://www.example.tld/picture.jpg", // (optional) Display an picture with the notification, alias of `bigPictureUrl` for Android. default: undefined

            // playSound: false, // (optional) default: true

            // number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
            // repeatType: "day", // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
          });


        } catch (e) {
          console.log('onMessage-6-error', JSON.stringify(e));
        }
      }

    });


    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      console.log('notification received : onNotificationOpenedApp : ', JSON.stringify(remoteMessage));

      try {
        const mLoggedIn = await AsyncStorage.getItem('loggedIn');
        var mTL = false;
        if(mLoggedIn === "true"){
          mTL = true;
        }
        console.log("mLogggedIn ",mLoggedIn);
        handleNavigation(remoteMessage.data, mTL);
      } catch (e) {
        alert(e);
      }

    });

    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    messaging()
      .getInitialNotification()
      .then(async remoteMessage => {
        if (remoteMessage) {
          console.log('notification received : getInitialNotification', JSON.stringify(remoteMessage));


          //this.navigator.dispatch(NavigationActions.navigate({ routeName: 'StartScreen' }));

          try {
            // dispatch(notificationTerminated(remoteMessage.data));
            AsyncStorage.setItem('notification', JSON.stringify(remoteMessage.data))
            // setAppNotificationData(remoteMessage.data);

          } catch (e) {
            console.log("Erroe in getInitialNotification", e);

          }
        }
      });
  }
  const checkPermission = async () => {
    const enabled = await messaging().hasPermission();
    if (enabled) {
      getFcmToken();
    } else {
      requestPermission();
    }
  };

  const getFcmToken = async () => {
    const authorizationStatus = await messaging().requestPermission();
    await messaging().registerDeviceForRemoteMessages();
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log("device_token : " + fcmToken)
      await AsyncStorage.setItem("device_token", fcmToken);
      // user has a device token
    } else {
      // user doesn't have a device token yet
    }
  };

  const requestPermission = async () => {
    try {
      await messaging().requestPermission();
      getFcmToken()
      // User has authorised
    } catch (error) {
      // User has rejected permissions
    }
  };

  

  // if (fontsLoaded && !state.appLoading) {
  if (!splashLoaded) {
    return (
      <View style={styles.mainContainer}>
        {/* <StatusBar
          animated={true}
          backgroundColor="white"
          barStyle="default"
        // showHideTransition={statusBarTransition}
        hidden={true} 
        /> */}
        {/* <ActivityIndicator color={CommonColors.Green} size="large" /> */}
        <Image
          style={styles.ImageStyle}
          source={Images.app_logo}
        />
      </View>
    );
  }
  else if(state.appLoading){
    return (
      <View
        style={[
          CommonStyles.container,
          {
            backgroundColor: "transparent",
            alignItems: "center",
            justifyContent: "center",
          },
        ]}
      >
        <ActivityIndicator color={CommonColors.Green} size="large" />
      </View>
    );
  }
  else if(splashLoaded && !state.appLoading){
    return (
      <SafeAreaProvider>
        <View style={{ flex: 1 }}>
          <NavigationContainer style={CommonStyles.container} ref={navigationRef}>
            <Stack.Navigator
              screenOptions={{ headerShown: false }}
              initialRouteName="Auth"
            >
              {state.Introduce === false && state.loggedIn && <Stack.Screen name="intro" component={intro} />}
              {!state.loggedIn && <Stack.Screen name="Auth" component={Auth} />}
              {state.loggedIn && <Stack.Screen name="Root" component={Root} />}
              {state.loggedIn && (
                <RootStack.Group screenOptions={{ presentation: "card" }}>
                  <RootStack.Screen name="Sponsor" component={Sponsor} />
                  <RootStack.Screen
                    name="SponsorGalary"
                    component={SponsorGalary}
                  />

                  <RootStack.Screen
                    name="TournamentChoices"
                    component={TournamentChoices}
                  />
                  <RootStack.Screen name="NoChoice" component={NoChoice} />

                  <RootStack.Screen
                    name="CreateRabbitCards"
                    component={CreateRabbitCards}
                  />
                  <RootStack.Screen
                    name="Countdown"
                    component={TournamentCountDown}
                  />
                  <RootStack.Screen name="Pairings" component={Paring} />

                  <RootStack.Screen name="YouWin" component={YouWin} />
                  <RootStack.Screen
                    name="CompeteTournamentSelection"
                    component={CompeteTournamentSelection}
                  />
                  <RootStack.Screen
                    name="Shipping"
                    component={MyRabbitPurseShipping}
                  />

                  <RootStack.Screen name="Purse" component={MyRabbitPurse} />
                  <RootStack.Screen name="Thank You" component={Thankyou} />


                  <RootStack.Screen
                    name="SummaryPlayed"
                    component={RabbitCardSummaryPlayed}
                  />
                  <RootStack.Screen
                    name="SummaryInProgress"
                    component={RabbitCardSummaryInProgress}
                  />
                  <RootStack.Screen
                    name="TournamentPushNotification"
                    component={TournamentPushNotification}
                  />
                  <RootStack.Screen name="Calc" component={TournamentCalc} />
                  <RootStack.Screen
                    name="ReadyToPlay"
                    component={RabbitCardReadyToPlay}
                  />
                  <RootStack.Screen
                    name="ReadyToPlaySummary"
                    component={RabbitCardReadyToPlaySummary}
                  />
                  <RootStack.Screen name="TieBreaker" component={TieBreaker} />
                  <RootStack.Screen name="PlayerProfile" component={PlayerProfile} />
                  <RootStack.Screen
                    name="MyTournamentRanking"
                    component={MyTournamentRanking}
                  />
                  <RootStack.Screen
                    name="MyTournamentRankingProgress"
                    component={MyTournamentRankingProgress}
                  />
                </RootStack.Group>
              )}
              {state.loggedIn && (
                <RootStack.Group screenOptions={{ presentation: "modal" }}>
                   <RootStack.Screen
                    name="PlayerScreen"
                    component={PlayerScreen}
                  />
                </RootStack.Group>
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </SafeAreaProvider>

    );
  }
  // else {
  //   return (
  //     <View
  //       style={[
  //         CommonStyles.container,
  //         {
  //           backgroundColor: "transparent",
  //           alignItems: "center",
  //           justifyContent: "center",
  //         },
  //       ]}
  //     >
  //       <ActivityIndicator color={CommonColors.Green} size="large" />
  //     </View>
  //   );
  // }
};

const App = () => {
  return (
    <View>
        <StatusBar backgroundColor='blue' barStyle='light-content' />
      </View>,
    <RootNavigator />
  );
};

export default App;
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
    alignItems: "center",
  },
  ImageStyle: {
    height: 140,
    resizeMode: "contain",
  },
});
