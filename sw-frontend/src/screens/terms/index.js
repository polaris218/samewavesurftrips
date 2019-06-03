import React from 'react'
import { Header, ScrollContainer } from 'components'
import { Content, Title, Terms } from './styles'

const TermsScreen = props => {
  return (
    <Terms>
      <ScrollContainer navbar={false}>
        <Header
          nav={false}
          backButton
          homeButton={false}
          title='Terms and Conditions'
        />
        <Content>
          <h1>SAMEWAVE SURF TRIPS</h1>
          <Title>Introduction</Title>
          These Website Standard Terms and Conditions written on this webpage
          shall manage your use of our website, SameWave Surf Trips accessible
          at www.samewavesurftrips.com These Terms will be applied fully and
          affect to your use of this Website. By using this Website, you agreed
          to accept all terms and conditions written in here. You must not use
          this Website if you disagree with any of these Website Standard Terms
          and Conditions. Minors or people below 18 years old are not allowed to
          use this Website.
          <Title>Intellectual Property Rights</Title>
          Other than the content you own, under these Terms, SAMEWAVE SURF TRIPS
          and/or its licensors own all the intellectual property rights and
          materials contained in this Website. You are granted limited license
          only for purposes of viewing the material contained on this Website.
          <Title>Restrictions</Title>
          You are specifically restricted from all of the following:
          <ul>
            <li>publishing any Website material in any other media;</li>
            <li>
              selling, sublicensing and/or otherwise commercializing any Website
              material;
            </li>
            <li>publicly performing and/or showing any Website material;</li>
            <li>
              using this Website in any way that is or may be damaging to this
              Website;
            </li>
            <li>
              using this Website in any way that impacts user access to this
              Website;
            </li>
            <li>
              using this Website contrary to applicable laws and regulations, or
              in any way may cause harm to the Website, or to any person or
              business entity;
            </li>
            <li>
              engaging in any data mining, data harvesting, data extracting or
              any other similar activity in relation to this Website;
            </li>
            <li>
              using this Website to engage in any advertising or marketing.
            </li>
          </ul>
          Certain areas of this Website are restricted from being access by you
          and SAMEWAVE SURF TRIPS may further restrict access by you to any
          areas of this Website, at any time, in absolute discretion. Any user
          ID and password you may have for this Website are confidential and you
          must maintain confidentiality as well.
          <Title>Your Content</Title>
          In these Website Standard Terms and Conditions, “Your Content” shall
          mean any audio, video text, images or other material you choose to
          display on this Website. By displaying Your Content, you grant
          SAMEWAVE SURF TRIPS a non-exclusive, worldwide irrevocable, sub
          licensable license to use, reproduce, adapt, publish, translate and
          distribute it in any and all media. Your Content must be your own and
          must not be invading any third-party's rights. SAMEWAVE SURF TRIPS
          reserves the right to remove any of Your Content from this Website at
          any time without notice.
          <Title>No warranties</Title>
          This Website is provided “as is,” with all faults, and SAMEWAVE SURF
          TRIPS express no representations or warranties, of any kind related to
          this Website or the materials contained on this Website. Also, nothing
          contained on this Website shall be interpreted as advising you.
          <Title>Limitation of liability</Title>
          In no event shall SAMEWAVE SURF TRIPS, nor any of its officers,
          directors and employees, shall be held liable for anything arising out
          of or in any way connected with your use of this Website whether such
          liability is under contract. SAMEWAVE SURF TRIPS, including its
          officers, directors and employees shall not be held liable for any
          indirect, consequential or special liability arising out of or in any
          way related to your use of this Website.
          <Title>Indemnification</Title>
          You hereby indemnify to the fullest extent SAMEWAVE SURF TRIPS from
          and against any and/or all liabilities, costs, demands, causes of
          action, damages and expenses arising in any way related to your breach
          of any of the provisions of these Terms.
          <Title>Severability</Title>
          If any provision of these Terms is found to be invalid under any
          applicable law, such provisions shall be deleted without affecting the
          remaining provisions herein.
          <Title>Variation of Terms</Title>
          SAMEWAVE SURF TRIPS is permitted to revise these Terms at any time as
          it sees fit, and by using this Website you are expected to review
          these Terms on a regular basis.
          <Title>Assignment</Title>
          The SAMEWAVE SURF TRIPS is allowed to assign, transfer, and
          subcontract its rights and/or obligations under these Terms without
          any notification. However, you are not allowed to assign, transfer, or
          subcontract any of your rights and/or obligations under these Terms.
          <Title>Entire Agreement</Title>
          These Terms constitute the entire agreement between SAMEWAVE SURF
          TRIPS and you in relation to your use of this Website, and supersede
          all prior agreements and understandings.
          <Title>Governing Law & Jurisdiction</Title>
          These Terms will be governed by and interpreted in accordance with the
          laws of the State of Australia, and you submit to the non-exclusive
          jurisdiction of the state and federal courts located in Australia for
          the resolution of any disputes.
        </Content>
      </ScrollContainer>
    </Terms>
  )
}

export default TermsScreen
