import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  Svg,
  Path,
} from "@react-pdf/renderer";
import { resumeData } from "@/lib/resume";

// High-contrast color palette optimized for printing on pure white paper
const colors = {
  bg: "#FFFFFF",
  cardBg: "#F9FAFB", // Light gray for card containers
  primary: "#C2410C", // Rich high-contrast orange (WCAG compliant on white)
  primaryLight: "#FFF7ED", // Warm subtle tint for badges
  primaryBorder: "#FDBA74", // Soft orange border
  textDark: "#111827", // Almost black for headers & roles
  textMedium: "#374151", // Charcoal for main body text
  textMuted: "#4B5563", // Dark gray for metadata & dates
  border: "#E5E7EB", // Light gray border
};

const styles = StyleSheet.create({
  page: {
    padding: 28,
    backgroundColor: colors.bg,
    fontFamily: "Helvetica",
    fontSize: 9,
    color: colors.textMedium,
    lineHeight: 1.4,
  },
  // Header Section
  header: {
    flexDirection: "row",
    justify: "space-between",
    alignItems: "center",
    paddingBottom: 12,
    marginBottom: 12,
    borderBottomWidth: 1.5,
    borderBottomColor: colors.primary,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: colors.primary,
    objectFit: "cover",
  },
  identity: {
    flexDirection: "column",
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    color: colors.textDark,
    letterSpacing: -0.3,
    marginBottom: 8, // Increased from 5 to give descenders ('g') breathing room
    lineHeight: 1.1, // Ensures clear vertical bounding box for big text
  },
  titlesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    marginTop: 2, // Gives additional clearance under the name
    alignItems: "center",
  },
  titleBadge: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primaryBorder,
    borderWidth: 0.5,
    borderRadius: 3,
    paddingTop: 2.5, // Balanced top padding
    paddingBottom: 2.5, // Balanced bottom padding
    paddingHorizontal: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  titleBadgeText: {
    fontSize: 7.5,
    fontFamily: "Helvetica-Bold",
    color: colors.primary,
    textAlign: "center",
    lineHeight: 1, // CRITICAL: Collapses extra text frame padding so top/bottom align strictly to the font
  },
  contactGrid: {
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 3,
    fontSize: 8,
    color: colors.textMuted,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  // Profile Summary Section
  summarySection: {
    backgroundColor: colors.cardBg,
    borderWidth: 0.5,
    borderColor: colors.border,
    borderRadius: 4,
    padding: 8,
    marginBottom: 12,
  },
  summaryTitle: {
    fontSize: 9.5,
    fontFamily: "Helvetica-Bold",
    color: colors.primary,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
    paddingBottom: 2,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
  },
  summaryText: {
    fontSize: 8.5,
    color: colors.textMedium,
    lineHeight: 1.4,
  },
  // Two Column Layout
  bodyLayout: {
    flexDirection: "row",
    gap: 12,
  },
  leftColumn: {
    width: "63%",
    flexDirection: "column",
    gap: 12,
  },
  rightColumn: {
    width: "37%",
    flexDirection: "column",
    gap: 10,
  },
  // Section Titles
  sectionHeader: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: colors.primary,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 6,
    paddingBottom: 2,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  // Experience & Education Entries
  entryBlock: {
    marginBottom: 10,
  },
  entryHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 2,
  },
  entryRole: {
    fontSize: 9.5,
    fontFamily: "Helvetica-Bold",
    color: colors.textDark,
  },
  entryCompany: {
    fontSize: 8.5,
    fontFamily: "Helvetica-Bold",
    color: colors.primary,
  },
  entryLocationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    marginTop: 2,
    marginBottom: 1,
  },
  locationIcon: {
    width: 7,
    height: 7,
    alignSelf: "center",
    marginTop: 0.5,
  },
  entryLocationText: {
    fontSize: 7.5,
    color: colors.textMuted,
    fontFamily: "Helvetica",
    lineHeight: 1,
    alignSelf: "center",
  },
  entryPeriodBadge: {
    backgroundColor: colors.cardBg,
    paddingVertical: 1.5,
    paddingHorizontal: 5,
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: colors.border,
    justifyContent: "center",
    alignItems: "center",
  },
  entryPeriodText: {
    fontSize: 7.5,
    color: colors.textMuted,
  },
  bulletList: {
    marginTop: 9,
    gap: 0.5,
  },
  bulletItem: {
    flexDirection: "row",
    gap: 1,
    fontSize: 8,
    color: colors.textMedium,
  },
  bulletDot: {
    color: colors.primary,
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    lineHeight: 1.2,
  },
  bulletText: {
    flex: 1,
    lineHeight: 1.2,
  },
  // Right Column Cards
  cardBox: {
    backgroundColor: colors.cardBg,
    borderWidth: 0.5,
    borderColor: colors.border,
    borderRadius: 4,
    padding: 7,
  },
  skillPill: {
    backgroundColor: "#FFFFFF",
    borderColor: colors.border,
    borderWidth: 0.5,
    borderRadius: 3,
    paddingVertical: 3,
    paddingHorizontal: 5,
    marginBottom: 3.5,
    fontSize: 7.5,
    color: colors.textDark,
    lineHeight: 1.3,
  },
  langRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 2.5,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
  },
  langName: {
    fontSize: 8.5,
    fontFamily: "Helvetica-Bold",
    color: colors.textDark,
  },
  langFluencyBadge: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 1.5,
    paddingHorizontal: 4.5,
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: colors.border,
    justify: "center",
    alignItems: "center",
  },
  langFluencyText: {
    fontSize: 7.5,
    color: colors.textMuted,
  },
  badgeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  hobbyBadge: {
    backgroundColor: "#FFFFFF",
    borderColor: colors.border,
    borderWidth: 0.5,
    borderRadius: 3,
    paddingVertical: 2,
    paddingHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  hobbyBadgeText: {
    fontSize: 7.5,
    color: colors.textMedium,
  },
});

export default function PdfDocument() {
  const {
    personalInfo,
    skills,
    interests,
    languages,
    hobbies,
    experience,
    education,
  } = resumeData;

  // Ensure absolute image URL when rendering in browser or PDF generator
  const photoUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/images/resume-photo.png`
      : "/images/resume-photo.png";

  return (
    <Document title={`${personalInfo.name} - Resume`}>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image src={photoUrl} style={styles.avatar} />
            <View style={styles.identity}>
              <Text style={styles.name}>{personalInfo.name}</Text>
              <View style={styles.titlesContainer}>
                {personalInfo.titles.map((title, idx) => (
                  <View key={idx} style={styles.titleBadge}>
                    <Text style={styles.titleBadgeText}>{title}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          <View style={styles.contactGrid}>
            <Text style={styles.contactItem}>{personalInfo.email}</Text>
            <Text style={styles.contactItem}>{personalInfo.phone}</Text>
            <Text style={styles.contactItem}>{personalInfo.location}</Text>
          </View>
        </View>

        {/* Profile Summary */}
        <View style={styles.summarySection}>
          <Text style={styles.summaryTitle}>Profile Summary</Text>
          <Text style={styles.summaryText}>
            {personalInfo.summary.replace(/\s+/g, " ").trim()}
          </Text>
        </View>

        {/* Main Content Layout */}
        <View style={styles.bodyLayout}>
          {/* Left Column: Experience & Education */}
          <View style={styles.leftColumn}>
            {/* Experience */}
            <View>
              <Text style={styles.sectionHeader}>Experience</Text>
              {experience.map((item, idx) => (
                <View key={idx} style={styles.entryBlock} wrap={false}>
                  <View style={styles.entryHeaderRow}>
                    <View style={{ flex: 1, paddingRight: 4 }}>
                      <Text style={styles.entryRole}>{item.role}</Text>
                      <Text style={styles.entryCompany}>{item.company}</Text>
                      {item.location && (
                        <View style={styles.entryLocationRow}>
                          <Svg viewBox="0 0 24 24" style={styles.locationIcon}>
                            <Path
                              fill={colors.textMuted}
                              d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"
                            />
                          </Svg>
                          <Text style={styles.entryLocationText}>
                            {item.location}
                          </Text>
                        </View>
                      )}
                    </View>
                    <View style={styles.entryPeriodBadge}>
                      <Text style={styles.entryPeriodText}>{item.period}</Text>
                    </View>
                  </View>

                  <View style={styles.bulletList}>
                    {item.bullets.map((bullet, bIdx) => (
                      <View key={bIdx} style={styles.bulletItem}>
                        <Text style={styles.bulletDot}>•</Text>
                        <Text style={styles.bulletText}>{bullet}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </View>

            {/* Education */}
            <View>
              <Text style={styles.sectionHeader}>Education</Text>
              {education.map((item, idx) => (
                <View key={idx} style={styles.entryBlock} wrap={false}>
                  <View style={styles.entryHeaderRow}>
                    <View style={{ flex: 1, paddingRight: 4 }}>
                      <Text style={styles.entryRole}>{item.degree}</Text>
                      <Text style={styles.entryCompany}>
                        {item.institution}
                      </Text>
                    </View>
                    <View style={styles.entryPeriodBadge}>
                      <Text style={styles.entryPeriodText}>{item.period}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Right Column: Skills, Languages, Interests, Hobbies */}
          <View style={styles.rightColumn}>
            {/* Skills */}
            <View style={styles.cardBox} wrap={false}>
              <Text style={styles.sectionHeader}>Skills</Text>
              {skills.map((skill, idx) => (
                <Text key={idx} style={styles.skillPill}>
                  {skill}
                </Text>
              ))}
            </View>

            {/* Languages */}
            <View style={styles.cardBox} wrap={false}>
              <Text style={styles.sectionHeader}>Languages</Text>
              {languages.map((item, idx) => (
                <View key={idx} style={styles.langRow}>
                  <Text style={styles.langName}>{item.language}</Text>
                  <View style={styles.langFluencyBadge}>
                    <Text style={styles.langFluencyText}>{item.fluency}</Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Interests */}
            <View style={styles.cardBox} wrap={false}>
              <Text style={styles.sectionHeader}>Interests</Text>
              {interests.map((interest, idx) => (
                <Text key={idx} style={styles.skillPill}>
                  {interest}
                </Text>
              ))}
            </View>

            {/* Hobbies */}
            <View style={styles.cardBox} wrap={false}>
              <Text style={styles.sectionHeader}>Hobbies</Text>
              <View style={styles.badgeContainer}>
                {hobbies.map((hobby, idx) => (
                  <View key={idx} style={styles.hobbyBadge}>
                    <Text style={styles.hobbyBadgeText}>{hobby}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
