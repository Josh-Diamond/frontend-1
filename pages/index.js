import React from "react"
import { getPrismicApi } from "../prismic"
import Seo from "../components/Seo"
import { breakingPoints } from "../components/Styles"
import SliceResolver from "../components/SliceResolver"

export default function IndexPage({ doc: { data } }) {
  console.log(data)
  return (
    <div>
      {/* <Seo data={data} /> */}
      <div
        css={{
          display: "flex",
          height: "100vh",
          marginTop: "-40px",
          backgroundColor: "#ffffff",
        }}>
        <div
          css={{
            width: "60%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRight: "1px solid #082B84",
            [breakingPoints.md]: {
              display: 'none',
            },
          }}>
          <img
            src="../static/loginICONS.png"
            alt="WellDone Icons"
            css={{ width: "90%" }}
          />
        </div>
        <div
          css={{
            width: "40%",
            backgroundColor: "#F3F7FC",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            [breakingPoints.md]: {
              width: '100%',
            },
          }}>
          <div
            css={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
            <h4
              css={{
                alignSelf: "flex-start",
                marginTop: "0px",
                fontSize: "2.5rem",
                fontWeight: "500",
              }}>
              Sign In
            </h4>
            <form
              css={{ display: "flex", flexDirection: "column", width: "100%" }}>
              <label for="email" css={{ marginBottom: "5%" }}>
                Email
              </label>
              <input
                type="text"
                name="email"
                id="email"
                css={{ marginBottom: "5%",border: '1px solid silver', borderRadius: "2px" }}
              />
              <br />
              <label for="password" css={{ marginBottom: "5%" }}>
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                css={{ marginBottom: "5%", border: '1px solid silver', borderRadius: "2px" }}
              />
              <br />
              <button
                css={{
                  height: "30px",
                  backgroundColor: "#027EF3",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "2px",
                }}>
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

IndexPage.getInitialProps = async context => {
  const { api, ref } = await getPrismicApi(context)
  const doc = await api.getSingle("home_page", { ref })
  return { doc }
}
