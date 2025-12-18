import React, { Fragment } from 'react'
import Link from 'gatsby-link'

import TwoColumns from 'components/twoColumns'
import SectionHeading from 'components/sectionHeading'
import Project from 'components/project'

import ResidentialBuildingLogo from 'img/articles/project1/img1.jpg'
// you can add another image later if you want

const ResidentialBuildingLink = <Link to="/project1">Read More</Link>
const SustainableMaterialsLink = <Link to="/project2">Read More</Link>

const Work = () => {
  return (
    <TwoColumns
      wide
      leftColumn={<SectionHeading>Work</SectionHeading>}
      rightColumn={
        <Fragment>
          <Project
            logo={ResidentialBuildingLogo}
            title="Design and Analysis of a Residential Building"
            abstract="Designed a two-storey residential building using AutoCAD and STAAD Pro. Carried out load calculations and structural analysis to ensure safety, stability, and compliance with basic design standards."
            link={ResidentialBuildingLink}
          />

          <Project
            logo=""
            title="Sustainable Building Materials for Low-Cost Housing"
            abstract="Research-focused project exploring eco-friendly and cost-effective construction materials aimed at improving sustainability and affordability in housing projects."
            link={SustainableMaterialsLink}
          />
        </Fragment>
      }
    />
  )
}

export default Work
