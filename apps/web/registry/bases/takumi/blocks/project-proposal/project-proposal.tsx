import { PdfGraph } from "@/registry/bases/takumi/components/graph/graph";
import { KeepTogether } from "@/registry/bases/takumi/components/keep-together/keep-together";
import { PdfList } from "@/registry/bases/takumi/components/list/list";
import { PageFooter } from "@/registry/bases/takumi/components/page-footer/page-footer";
import { Section } from "@/registry/bases/takumi/components/section/section";
import { PdfSignatureBlock } from "@/registry/bases/takumi/components/signature/signature";
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

import type { ProjectProposalProps } from "./project-proposal.types";

// Sample data — replace with your own props or data source
const sampleData: ProjectProposalProps = {
  accentColor: "#7c3aed",
  budget: [
    { label: "Research", value: 15 },
    { label: "Design", value: 30 },
    { label: "Engineering", value: 45 },
    { label: "Launch", value: 10 },
  ],
  client: "Greenleaf Markets",
  company: "Studio Kite",
  date: "September 2026",
  deliverables: [
    "Research with 20 shoppers across three stores",
    "Interactive prototype tested in-store",
    "iOS and Android apps with points and offers",
    "Launch plan and staff training",
  ],
  milestones: [
    { body: "Goals and scope agreed.", date: "Oct 2026", title: "Kick-off" },
    { body: "First customers onboarded.", date: "Dec 2026", title: "Beta" },
    { body: "Available to everyone.", date: "Jan 2027", title: "Launch" },
  ],
  nextSteps: [
    { done: true, text: "Review proposal" },
    { text: "Agree scope and budget" },
    { text: "Sign and schedule kick-off" },
  ],
  projectTitle: "A loyalty app your shoppers will open every week",
  stats: [
    { label: "Timeline", note: "Oct to Jan", value: "14 weeks" },
    { label: "Investment", note: "Fixed price", value: "$84k" },
    { label: "Team", note: "Design and build", value: "5 people" },
  ],
};

const ProjectProposalContent = ({ data }: { data: ProjectProposalProps }) => {
  const theme = usePdfcnTheme();

  const styles = StyleSheet.create({
    milestoneRow: {
      marginBottom: 10,
    },
    page: {
      backgroundColor: theme.colors.background,
      boxSizing: "border-box",
      minHeight: 841,
      padding: theme.spacing.page.marginTop,
      paddingBottom: theme.spacing.page.marginBottom,
      position: "relative",
    },
    statRow: {
      display: "flex",
      flexDirection: "row",
      gap: 12,
      marginBottom: 4,
    },
    statTile: {
      borderColor: theme.colors.border,
      borderRadius: 8,
      borderStyle: "solid",
      borderWidth: 1,
      flex: 1,
      padding: 12,
    },
  });

  const accent = data.accentColor ?? theme.colors.primary;
  const budgetTotal = data.budget.reduce((sum, slice) => sum + slice.value, 0);
  const budgetPalette = [
    accent,
    theme.colors.info ?? "#3B82F6",
    theme.colors.success ?? "#22C55E",
    theme.colors.warning ?? "#F59E0B",
  ];

  return (
    <Document title={`Project Proposal — ${data.projectTitle}`}>
      <Page size="A4" style={styles.page}>
        <Section spacing="none">
          <Text
            variant="xs"
            weight="bold"
            transform="uppercase"
            color={accent}
            noMargin
          >
            {`Proposal for ${data.client}`}
          </Text>
          <Text variant="2xl" weight="bold" noMargin>
            {data.projectTitle}
          </Text>
          <Text variant="sm" color="mutedForeground" noMargin>
            {`Prepared by ${data.company}, ${data.date}`}
          </Text>
        </Section>
        <Section spacing="sm">
          <View style={styles.statRow}>
            {data.stats.map((stat) => (
              <View key={`${stat.label}-${stat.value}`} style={styles.statTile}>
                <Text
                  variant="xs"
                  weight="semibold"
                  transform="uppercase"
                  color="mutedForeground"
                  noMargin
                >
                  {stat.label}
                </Text>
                <Text variant="xl" weight="bold" color={accent} noMargin>
                  {stat.value}
                </Text>
                {stat.note && (
                  <Text variant="xs" color="mutedForeground" noMargin>
                    {stat.note}
                  </Text>
                )}
              </View>
            ))}
          </View>
        </Section>
        <Section spacing="sm">
          <Text variant="lg" weight="bold" noMargin>
            What we will deliver
          </Text>
          <PdfList
            variant="numbered"
            items={data.deliverables.map((deliverable) => ({
              text: deliverable,
            }))}
          />
        </Section>
        <Section spacing="sm">
          <Text variant="lg" weight="bold" noMargin>
            Timeline
          </Text>
          {data.milestones.map((milestone) => (
            <KeepTogether key={`${milestone.date}-${milestone.title}`}>
              <View style={styles.milestoneRow}>
                <Text
                  variant="xs"
                  weight="semibold"
                  transform="uppercase"
                  color={accent}
                  noMargin
                >
                  {milestone.date}
                </Text>
                <Text variant="sm" weight="semibold" noMargin>
                  {milestone.title}
                </Text>
                <Text variant="sm" color="mutedForeground" noMargin>
                  {milestone.body}
                </Text>
              </View>
            </KeepTogether>
          ))}
        </Section>
        <Section spacing="sm">
          <Text variant="lg" weight="bold" noMargin>
            Budget
          </Text>
          <PdfGraph
            variant="donut"
            data={data.budget.map((slice) => ({
              label: slice.label,
              value: slice.value,
            }))}
            legend="right"
            centerLabel={`${budgetTotal}`}
            colors={budgetPalette}
            height={220}
          />
        </Section>
        <Section spacing="sm">
          <Text variant="lg" weight="bold" noMargin>
            Next steps
          </Text>
          <PdfList
            variant="checklist"
            items={data.nextSteps.map((step) => ({
              checked: step.done ?? false,
              text: step.text,
            }))}
          />
        </Section>
        <Section spacing="sm">
          <Text variant="lg" weight="bold" noMargin>
            Sign-off
          </Text>
          <PdfSignatureBlock
            variant="double"
            signers={[
              {
                date: data.date,
                label: `For ${data.company}`,
                name: data.company,
                title: "Studio",
              },
              {
                date: data.date,
                label: `For ${data.client}`,
                name: data.client,
                title: "Client",
              },
            ]}
          />
        </Section>
        <PageFooter
          leftText={data.company}
          rightText={`${data.client} · ${data.date}`}
          sticky
          pagePadding={25}
        />
      </Page>
    </Document>
  );
};

const stripUndefined = <T extends object>(obj?: T): Partial<T> =>
  Object.fromEntries(
    Object.entries((obj ?? {}) as Record<string, unknown>).filter(
      ([, value]) => value !== undefined
    )
  ) as Partial<T>;

export const ProjectProposalDocument = ({
  theme,
  data,
  ...props
}: {
  theme?: PdfcnTheme;
  data?: ProjectProposalProps;
} & Partial<ProjectProposalProps>) => {
  const callerData = { ...stripUndefined(data), ...stripUndefined(props) };
  const hasCallerData = Object.keys(callerData).length > 0;
  const merged: ProjectProposalProps = hasCallerData
    ? {
        ...sampleData,
        ...callerData,
        // Identity belongs to the caller's proposal. When a caller supplies
        // proposal data, the company, client, title and date come only from
        // the caller: the sample studio details must never leak in.
        client: callerData.client as string,
        company: callerData.company as string,
        date: callerData.date as string,
        projectTitle: callerData.projectTitle as string,
      }
    : sampleData;
  return (
    <PdfcnThemeProvider theme={theme}>
      <ProjectProposalContent data={merged} />
    </PdfcnThemeProvider>
  );
};
