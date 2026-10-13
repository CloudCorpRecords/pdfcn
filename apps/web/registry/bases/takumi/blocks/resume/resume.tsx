import { Badge } from "@/registry/bases/takumi/components/badge/badge";
import { PdfImage } from "@/registry/bases/takumi/components/pdf-image/pdf-image";
import { Section } from "@/registry/bases/takumi/components/section/section";
import { Text } from "@/registry/bases/takumi/components/text/text";
import {
  PdfcnThemeProvider,
  usePdfcnTheme,
} from "@/registry/bases/takumi/components/theme-provider";
import {
  Document,
  Page,
  StyleSheet,
  View,
} from "@/registry/bases/takumi/lib/pdf-primitives";
import type { PdfcnTheme } from "@/registry/types/pdf-themes";

import type { ResumeProps } from "./resume.types";

// Sample data — replace with your own props or data source
const sampleData: ResumeProps = {
  accentColor: "#0f766e",
  contact: {
    email: "sam@rivera.design",
    location: "Lisbon, Portugal",
    website: "rivera.design",
  },
  education: [
    {
      degree: "BA Communication Design",
      school: "University of Porto",
      year: "2016",
    },
  ],
  experience: [
    {
      company: "Tidewave",
      details: "Led the redesign of the mobile banking app; activation up 23%.",
      period: "2022 to now",
      title: "Lead Designer",
    },
    {
      company: "Loom & Co",
      details: "Built the design system used by 40 engineers across 6 teams.",
      period: "2019 to 2022",
      title: "Product Designer",
    },
    {
      company: "Fieldnote",
      details: "Designed onboarding and billing for a 200k-user SaaS.",
      period: "2016 to 2019",
      title: "UX Designer",
    },
  ],
  name: "Sam Rivera",
  role: "Senior Product Designer",
  skills: [
    "Product strategy",
    "Interaction design",
    "Design systems",
    "Prototyping",
    "User research",
    "Figma",
  ],
  summary:
    "Product designer with nine years of experience shipping consumer and B2B software. I turn fuzzy problems into simple, measurable products.",
};

const ResumeContent = ({ data }: { data: ResumeProps }) => {
  const theme = usePdfcnTheme();

  const styles = StyleSheet.create({
    contactLine: {
      marginTop: 2,
    },
    educationRow: {
      alignItems: "flex-start",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 6,
    },
    experienceRow: {
      alignItems: "flex-start",
      display: "flex",
      flexDirection: "row",
      marginBottom: 10,
    },
    headerRow: {
      alignItems: "flex-start",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    heading: {
      fontSize: 9,
      fontWeight: "bold",
      marginBottom: 4,
    },
    page: {
      backgroundColor: theme.colors.background,
      boxSizing: "border-box",
      minHeight: 841,
      padding: 36,
      position: "relative",
    },
    period: {
      width: 92,
    },
    photo: {
      borderRadius: 32,
      height: 64,
      margin: 0,
      width: 64,
    },
    skillsRow: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 6,
    },
  });

  const contactParts = [
    data.contact.email,
    data.contact.phone,
    data.contact.location,
    data.contact.website,
  ].filter(
    (part): part is string => typeof part === "string" && part.length > 0
  );
  const accent = data.accentColor ?? "primary";

  return (
    <Document title={`Resume — ${data.name}`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerRow}>
          <View>
            <Text
              variant="xs"
              weight="bold"
              transform="uppercase"
              color={accent}
              noMargin
            >
              {data.role}
            </Text>
            <Text variant="2xl" weight="bold" noMargin>
              {data.name}
            </Text>
            <Text
              variant="sm"
              color="mutedForeground"
              style={styles.contactLine}
              noMargin
            >
              {contactParts.join(" · ")}
            </Text>
          </View>
          {data.photoUrl && (
            <PdfImage src={data.photoUrl} style={styles.photo} />
          )}
        </View>
        <Section spacing="sm">
          <Text
            style={styles.heading}
            color={accent}
            transform="uppercase"
            noMargin
          >
            Summary
          </Text>
          <Text variant="sm" noMargin>
            {data.summary}
          </Text>
        </Section>
        <Section spacing="sm">
          <Text
            style={styles.heading}
            color={accent}
            transform="uppercase"
            noMargin
          >
            Experience
          </Text>
          {data.experience.map((entry) => (
            <View
              key={`${entry.period}-${entry.title}`}
              style={styles.experienceRow}
            >
              <Text
                variant="xs"
                color="mutedForeground"
                style={styles.period}
                noMargin
              >
                {entry.period}
              </Text>
              <View>
                <Text variant="sm" weight="semibold" noMargin>
                  {`${entry.title} · ${entry.company}`}
                </Text>
                <Text variant="sm" noMargin>
                  {entry.details}
                </Text>
              </View>
            </View>
          ))}
        </Section>
        <Section spacing="sm">
          <Text
            style={styles.heading}
            color={accent}
            transform="uppercase"
            noMargin
          >
            Skills
          </Text>
          <View style={styles.skillsRow}>
            {data.skills.map((skill) => (
              <Badge key={skill} label={skill} size="sm" variant="outline" />
            ))}
          </View>
        </Section>
        <Section spacing="sm">
          <Text
            style={styles.heading}
            color={accent}
            transform="uppercase"
            noMargin
          >
            Education
          </Text>
          {data.education.map((entry) => (
            <View
              key={`${entry.degree}-${entry.school}`}
              style={styles.educationRow}
            >
              <View>
                <Text variant="sm" weight="semibold" noMargin>
                  {entry.degree}
                </Text>
                <Text variant="sm" color="mutedForeground" noMargin>
                  {entry.school}
                </Text>
              </View>
              {entry.year && (
                <Text variant="xs" color="mutedForeground" noMargin>
                  {entry.year}
                </Text>
              )}
            </View>
          ))}
        </Section>
        <Text align="center" variant="xs" color="mutedForeground" noMargin>
          References available on request
        </Text>
      </Page>
    </Document>
  );
};

export const ResumeDocument = ({
  theme,
  data,
  ...props
}: {
  theme?: PdfcnTheme;
  data?: ResumeProps;
} & Partial<ResumeProps>) => (
  <PdfcnThemeProvider theme={theme}>
    <ResumeContent data={{ ...sampleData, ...data, ...props }} />
  </PdfcnThemeProvider>
);
