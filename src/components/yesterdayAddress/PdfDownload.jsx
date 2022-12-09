import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    color: "black",
  },
  section: {
    margin: 10,
    padding: 10,
  },
  viewer: {
    width: window.innerWidth, //the pdf viewer will take up all of the width and height
    height: window.innerHeight,
  },
});

function PdfDownload() {
  const [yesterday, setYesterday] = useState([]);
  const AdminDeatails = useSelector((state) => state.admin.value);
  useEffect(() => {
    (async function () {
      let date = new Date();
      date.setDate(date.getDate() - 1);
      const month = date.getMonth() + 1;
      const Yesterday = date.getDate() + "/" + month + "/" + date.getFullYear();
      console.log(Yesterday, "dmcm");
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            "auth-token": AdminDeatails.Token,
          },
        };
        const { data } = await axios.post(
          "/api/superAdmin/Yesterday-orders",
          { Yesterday },
          config
        );

        setYesterday(data);
      } catch (error) {}
    })();
  }, []);

  return (
    <PDFViewer style={styles.viewer}>
      {/* Start of the document*/}
      <Document>
        {/*render a single page*/}

        <Page size="A4" style={styles.page}>
          {yesterday.map((items) => {
            return (
              <>
                <View style={styles.section}>
                  <Text>TO:</Text>
                  <Text>
                    {items.Address.Name} {items.Address.LastName}
                  </Text>
                  <Text>{items.Address.StreetAddress}</Text>
                  <Text>
                    {items.Address.Pincode},{items.Address.TownCity},
                    {items.Address.State}
                  </Text>
                  <Text>{items.Address.PhoneNumber}</Text>
                </View>
                <View style={styles.section}>
                  <Text>FROM:</Text>
                  {items.user ? (
                    <>
                      <Text>MOFFA CLOTHING</Text>
                      <Text>1st FLOOR,62/9112</Text>
                      <Text>CONVENT ROAD</Text>
                      <Text>682035,ERNAKULAM,KERALA</Text>
                    </>
                  ) : (
                    <>
                      <Text>
                        {items.FromAddress.FromName}{" "}
                        {items.FromAddress.FromLastName}
                      </Text>
                      <Text>{items.FromAddress.FromStreetAddress}</Text>
                      <Text>
                        {items.FromAddress.FromPincode},
                        {items.FromAddress.FromTownCity},
                        {items.FromAddress.FromState}
                      </Text>
                      <Text>{items.FromAddress.FromPhoneNumber}</Text>
                    </>
                  )}
                </View>
              </>
            );
          })}
        </Page>
      </Document>
    </PDFViewer>
  );
}

export default PdfDownload;
