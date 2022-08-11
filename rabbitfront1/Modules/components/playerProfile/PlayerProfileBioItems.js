import React, {useEffect, useState} from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { CommonStyles } from '../../style';
import { w } from '../../../utils/scale'
import axios from 'axios';
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IllUbGtaVEUyTW1OaFpUWTVZVGMzWW1FMVlXWXhNVEZrTW1ZelpUQTJPV1UzWldNeVlUVmtNQT09In0.eyJhdWQiOiJodHRwOlwvXC9vcmcud3NvMi5hcGltZ3RcL2dhdGV3YXkiLCJzdWIiOiJSYWJiaXRDYXJkQGNhcmJvbi5zdXBlciIsImFwcGxpY2F0aW9uIjp7Im93bmVyIjoiUmFiYml0Q2FyZCIsInRpZXIiOiIxMFBlck1pbiIsIm5hbWUiOiJzeW5kc2N0ZXN0IiwiaWQiOjQ4MSwidXVpZCI6bnVsbH0sInNjb3BlIjoiYW1fYXBwbGljYXRpb25fc2NvcGUgZGVmYXVsdCIsImlzcyI6Imh0dHBzOlwvXC9hcGktdGVzdC1zaXRlcy5wZ2F0b3VyaHEuY29tOjk0NDNcL29hdXRoMlwvdG9rZW4iLCJ0aWVySW5mbyI6eyJCcm9uemUiOnsic3RvcE9uUXVvdGFSZWFjaCI6dHJ1ZSwic3Bpa2VBcnJlc3RMaW1pdCI6MSwic3Bpa2VBcnJlc3RVbml0Ijoic2VjIn0sIlNpbHZlciI6eyJzdG9wT25RdW90YVJlYWNoIjp0cnVlLCJzcGlrZUFycmVzdExpbWl0IjoxMCwic3Bpa2VBcnJlc3RVbml0Ijoic2VjIn19LCJrZXl0eXBlIjoiU0FOREJPWCIsInN1YnNjcmliZWRBUElzIjpbeyJzdWJzY3JpYmVyVGVuYW50RG9tYWluIjoiY2FyYm9uLnN1cGVyIiwibmFtZSI6IlN5bmRTY29yZWNhcmQiLCJjb250ZXh0IjoiXC9TeW5kU2NvcmVjYXJkXC8xLjAuMCIsInB1Ymxpc2hlciI6ImtoYWxsIiwidmVyc2lvbiI6IjEuMC4wIiwic3Vic2NyaXB0aW9uVGllciI6IkJyb256ZSJ9LHsic3Vic2NyaWJlclRlbmFudERvbWFpbiI6ImNhcmJvbi5zdXBlciIsIm5hbWUiOiJTeW5kVG91cm5hbWVudEZpZWxkIiwiY29udGV4dCI6IlwvU3luZFRvdXJuYW1lbnRGaWVsZFwvMS4wLjAiLCJwdWJsaXNoZXIiOiJmY2xlYXJ5IiwidmVyc2lvbiI6IjEuMC4wIiwic3Vic2NyaXB0aW9uVGllciI6IkJyb256ZSJ9LHsic3Vic2NyaWJlclRlbmFudERvbWFpbiI6ImNhcmJvbi5zdXBlciIsIm5hbWUiOiJBdmFpbGFibGVUZXN0VG91cm5hbWVudHMiLCJjb250ZXh0IjoiXC9BdmFpbGFibGVUZXN0VG91cm5hbWVudHNcLzEuMC4wIiwicHVibGlzaGVyIjoidGVzdGFkbWluIiwidmVyc2lvbiI6IjEuMC4wIiwic3Vic2NyaXB0aW9uVGllciI6IkJyb256ZSJ9LHsic3Vic2NyaWJlclRlbmFudERvbWFpbiI6ImNhcmJvbi5zdXBlciIsIm5hbWUiOiJTeW5kUGxheWVyc01hc3RlciIsImNvbnRleHQiOiJcL1N5bmRQbGF5ZXJzTWFzdGVyXC8xLjAuMCIsInB1Ymxpc2hlciI6ImtoYWxsIiwidmVyc2lvbiI6IjEuMC4wIiwic3Vic2NyaXB0aW9uVGllciI6IkJyb256ZSJ9LHsic3Vic2NyaWJlclRlbmFudERvbWFpbiI6ImNhcmJvbi5zdXBlciIsIm5hbWUiOiJTeW5kR3JvdXBpbmdzIiwiY29udGV4dCI6IlwvU3luZEdyb3VwaW5nc1wvMS4wLjAiLCJwdWJsaXNoZXIiOiJraGFsbCIsInZlcnNpb24iOiIxLjAuMCIsInN1YnNjcmlwdGlvblRpZXIiOiJCcm9uemUifSx7InN1YnNjcmliZXJUZW5hbnREb21haW4iOiJjYXJib24uc3VwZXIiLCJuYW1lIjoiU3luZExlYWRlcmJvYXJkIiwiY29udGV4dCI6IlwvU3luZExlYWRlcmJvYXJkXC8xLjAuMCIsInB1Ymxpc2hlciI6ImtoYWxsIiwidmVyc2lvbiI6IjEuMC4wIiwic3Vic2NyaXB0aW9uVGllciI6IkJyb256ZSJ9LHsic3Vic2NyaWJlclRlbmFudERvbWFpbiI6ImNhcmJvbi5zdXBlciIsIm5hbWUiOiJTeW5kU2NoZWR1bGUiLCJjb250ZXh0IjoiXC9TeW5kU2NoZWR1bGVcLzEuMC4wIiwicHVibGlzaGVyIjoia2hhbGwiLCJ2ZXJzaW9uIjoiMS4wLjAiLCJzdWJzY3JpcHRpb25UaWVyIjoiQnJvbnplIn0seyJzdWJzY3JpYmVyVGVuYW50RG9tYWluIjoiY2FyYm9uLnN1cGVyIiwibmFtZSI6IlN5bmRQbGF5ZXJCaW8iLCJjb250ZXh0IjoiXC9TeW5kUGxheWVyQmlvXC8xLjAuMCIsInB1Ymxpc2hlciI6ImtoYWxsIiwidmVyc2lvbiI6IjEuMC4wIiwic3Vic2NyaXB0aW9uVGllciI6IkJyb256ZSJ9LHsic3Vic2NyaWJlclRlbmFudERvbWFpbiI6ImNhcmJvbi5zdXBlciIsIm5hbWUiOiJTeW5kVG91cm5hbWVudEhvbGVTdGF0cyIsImNvbnRleHQiOiJcL1N5bmRUb3VybmFtZW50SG9sZVN0YXRzXC8xLjAuMCIsInB1Ymxpc2hlciI6ImZjbGVhcnkiLCJ2ZXJzaW9uIjoiMS4wLjAiLCJzdWJzY3JpcHRpb25UaWVyIjoiQnJvbnplIn0seyJzdWJzY3JpYmVyVGVuYW50RG9tYWluIjoiY2FyYm9uLnN1cGVyIiwibmFtZSI6IlN5bmRUb3VybmFtZW50RGV0YWlscyIsImNvbnRleHQiOiJcL1N5bmRUb3VybmFtZW50RGV0YWlsc1wvMS4wLjAiLCJwdWJsaXNoZXIiOiJmY2xlYXJ5IiwidmVyc2lvbiI6IjEuMC4wIiwic3Vic2NyaXB0aW9uVGllciI6IkJyb256ZSJ9LHsic3Vic2NyaWJlclRlbmFudERvbWFpbiI6ImNhcmJvbi5zdXBlciIsIm5hbWUiOiJTeW5kVG91cm5hbWVudFN0YXR1cyIsImNvbnRleHQiOiJcL1N5bmRUb3VybmFtZW50U3RhdHVzXC8xLjAuMCIsInB1Ymxpc2hlciI6ImFiYXJhZHdhaiIsInZlcnNpb24iOiIxLjAuMCIsInN1YnNjcmlwdGlvblRpZXIiOiJCcm9uemUifSx7InN1YnNjcmliZXJUZW5hbnREb21haW4iOiJjYXJib24uc3VwZXIiLCJuYW1lIjoiUGxheUJ5UGxheSIsImNvbnRleHQiOiJcL1BsYXlCeVBsYXlcLzEuMC4wIiwicHVibGlzaGVyIjoibmJlY2tlciIsInZlcnNpb24iOiIxLjAuMCIsInN1YnNjcmlwdGlvblRpZXIiOiJCcm9uemUifSx7InN1YnNjcmliZXJUZW5hbnREb21haW4iOiJjYXJib24uc3VwZXIiLCJuYW1lIjoiWVREX0VWVF9TdGF0aXN0aWNzIiwiY29udGV4dCI6IlwvWVREX0VWVF9TdGF0aXN0aWNzXC8xLjAuMCIsInB1Ymxpc2hlciI6ImFiYXJhZHdhaiIsInZlcnNpb24iOiIxLjAuMCIsInN1YnNjcmlwdGlvblRpZXIiOiJTaWx2ZXIifV0sImNvbnN1bWVyS2V5IjoickJOdmtJeTB3cUp1N0xaUG9ITVFoYVpZSDJFYSIsImV4cCI6MTYzNzYyMTkzMiwiaWF0IjoxNjM0MDIxOTMyLCJqdGkiOiI3ZTZjOWM0ZS05YmRjLTRhZGEtYWRjMi1mNjE3NDVhMjg2YjMifQ.To5iRBDEOlglY2pptM_RrSx5gjnuNi2yHuAuSpqW2QNBCS0-aJkmpONy4F9vlfoMXE7IN2PX0QmbfbHqXKRxYEBIiR9fA2i61IOXbQMoPGTk47B34o1xGRSWyyOM37iGY3EnPTitrz2vYxlKc2HfyiXvVsVQH4HjIGF2Px4qV49UFeeG688eS_FawSIzufGWhKI-p-J6_OVRxbWRL5DTwHT61vyNE1xl-mm4ry4Igj5JmnrqrDv2qsHRu4U-ZYgC25u_HciCNrKu5o2tGlYsAOe9ufJ_WdnaELSwJyt-9fN0UPkJaMgsz8Qb27BL09BYR_hU6MpvxJ6VOqUOfC2hfg";

const PlayerProfileBioItems = ({p_id}) => {
   const [data, setData] = useState({});

   useEffect( () => {
      (async () => {
         const result = await axios.get(
         `https://tourapi.pgatourhq.com:8243/SyndPlayerBio/1.0.0/?format=json&P_ID=${p_id}`,
         {
            headers: {
               'Content-Type': 'application/json',
               "authorization": "Bearer " + token.toString()
            }
         }
         );
         const player = result.data ? result.data.plr[0] : {}

         setData(player);
      })()
    }, []);

   const {
      name, 
      height, 
      weight, 
      birthdate, 
      birthPlace, 
      nationality, 
      combTourMoney,
      seasonHighlights,
      specialInterests,
      personalItems
    } = data

   if (!data.name) return <View/> 
    
   return (
      <View style={styles.body}>
         <View style={[styles.detail, styles.inline]}>
            <Text style={[CommonStyles.playerButtonText, styles.title]}>FULL NAME</Text>
            <Text style={styles.description}>
               {`${name.first} ${name.last}`}
            </Text>
         </View>
         <View style={[styles.detail, styles.inline]}>
            <Text style={[CommonStyles.playerButtonText, styles.title]}>NICK NAME</Text>
            <Text style={styles.description}>
               {name.nick}
            </Text>
         </View>
         <View style={[styles.detail, styles.inline]}>
            <Text style={[CommonStyles.playerButtonText, styles.title]}>HEIGHT</Text>
            <Text style={styles.description}>
               {`${height.feet}'${height.inches}''`}
            </Text>
         </View>
         <View style={[styles.detail, styles.inline]}>
            <Text style={[CommonStyles.playerButtonText, styles.title]}>WEIGHT</Text>
            <Text style={styles.description}>
               {`${weight.imperial} lbs`}
            </Text>
         </View>
         <View style={[styles.detail, styles.inline]}>
            <Text style={[CommonStyles.playerButtonText, styles.title]}>BIRTHDATE/PLACE</Text>
            <Text style={styles.description}>
            {`${birthdate ? birthdate  : ''}/${birthPlace}`}
            </Text>
         </View>
         <View style={[styles.detail, styles.inline]}>
            <Text style={[CommonStyles.playerButtonText, styles.title]}>NATIONALITY</Text>
            <Text style={styles.description}>
               {`${nationality}`}
            </Text>
         </View>
         <View style={[styles.detail, styles.inline]}>
            <Text style={[CommonStyles.playerButtonText, styles.title]}>TOUR WINNINGS</Text>
            <Text style={styles.description}>
               {`${combTourMoney}`}
            </Text>
         </View>
         <View style={[styles.detail]}>
            <Text style={[CommonStyles.playerButtonText, styles.title]}>CURRENT SEASON HIGHLIGHTS</Text>
            <Text style={styles.description}>
            {seasonHighlights && seasonHighlights.length && seasonHighlights[0].highlight}
            </Text>
         </View>
         <View style={[styles.detail]}>
            <Text style={[CommonStyles.playerButtonText, styles.title]}>SPECIAL INTERESTS</Text>
            <Text style={styles.description}>
               {specialInterests}
            </Text>
         </View>
         <View style={[styles.detail]}>
            <Text style={[CommonStyles.playerButtonText, styles.title]}>FUN FACT</Text>
            <Text style={styles.description}>
               {personalItems && personalItems.length && personalItems[0].text}
            </Text>
         </View>
      </View>
   )
}

export default PlayerProfileBioItems

const styles = StyleSheet.create({
   inline: {
      flexDirection: 'row'
    },
    title: {
      paddingRight: w(5)
    },
    body: {
      paddingTop: w(20)
    },
    detail: {
      paddingHorizontal: w(40),
      paddingBottom: w(15),
      alignItems: 'baseline'
    },
    description: {
      fontFamily: "SourceSansRomanLight",
      fontSize: w(28),
      lineHeight: w(30),
    }
 });