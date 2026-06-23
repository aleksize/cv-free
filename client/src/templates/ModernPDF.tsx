import { Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import type { CvData } from '../types/cv';

interface TemplateProps {
  data: CvData;
}

export default function ModernPDF({ data }: TemplateProps) {
  const accent = data.colorPreset || '#0ea5e9';
  const font = data.font || 'Inter';

  const pageMargin = data.margin === 'small' ? 20 : data.margin === 'large' ? 36 : 28;
  const itemGap = data.spacing === 'small' ? 3 : data.spacing === 'large' ? 8 : 5;
  const sectionGap = data.spacing === 'small' ? 8 : data.spacing === 'large' ? 16 : 12;

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#ffffff',
      padding: pageMargin,
      fontFamily: font,
      fontSize: 9,
      color: '#1e293b',
      lineHeight: 1.35,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
      borderBottomWidth: 2,
      borderBottomColor: accent,
      paddingBottom: 16,
      marginBottom: sectionGap + 4,
    },
    photo: {
      width: 60,
      height: 60,
      borderRadius: 30,
      objectFit: 'cover',
      borderWidth: 2,
      borderColor: accent,
    },
    headerText: {
      flex: 1,
    },
    fullName: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#0f172a',
      letterSpacing: -0.5,
    },
    jobTitle: {
      fontSize: 12,
      fontWeight: 'semibold',
      color: accent,
      marginTop: 2,
    },
    body: {
      flexDirection: 'row',
      gap: 20,
    },
    sidebar: {
      width: 160,
      flexDirection: 'column',
      gap: sectionGap,
    },
    mainContent: {
      flex: 1,
      flexDirection: 'column',
      gap: sectionGap,
    },
    section: {
      marginBottom: 2,
    },
    sectionTitle: {
      fontSize: 9.5,
      fontWeight: 'bold',
      color: '#0f172a',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      borderBottomWidth: 1,
      borderBottomColor: '#e2e8f0',
      paddingBottom: 2,
      marginBottom: 6,
    },
    sidebarSectionTitle: {
      fontSize: 9,
      fontWeight: 'bold',
      color: '#0f172a',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      backgroundColor: '#f8fafc',
      paddingHorizontal: 6,
      paddingVertical: 3,
      borderLeftWidth: 2,
      borderLeftColor: accent,
      marginBottom: 6,
    },
    contactItem: {
      marginBottom: 4,
    },
    contactLabel: {
      fontSize: 7.5,
      color: '#64748b',
      textTransform: 'uppercase',
      fontWeight: 'semibold',
    },
    contactValue: {
      fontSize: 8.5,
      color: '#334155',
    },
    skillTag: {
      fontSize: 8,
      backgroundColor: '#f1f5f9',
      color: '#334155',
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 3,
      marginBottom: 3,
      marginRight: 3,
    },
    skillsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    item: {
      marginBottom: itemGap,
    },
    itemHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
    },
    itemTitle: {
      fontSize: 9.5,
      fontWeight: 'bold',
      color: '#0f172a',
    },
    itemDates: {
      fontSize: 8,
      color: '#64748b',
    },
    itemSub: {
      fontSize: 8.5,
      color: accent,
      fontWeight: 'semibold',
      marginBottom: 2,
    },
    itemDesc: {
      fontSize: 8.5,
      color: '#475569',
      whiteSpace: 'pre-wrap',
    },
    langRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 3,
    },
    langName: {
      fontSize: 8.5,
      fontWeight: 'semibold',
    },
    langLevel: {
      fontSize: 8,
      color: '#64748b',
    },
    certItem: {
      marginBottom: 5,
    },
    certName: {
      fontSize: 8.5,
      fontWeight: 'semibold',
      color: '#0f172a',
    },
    certIssuer: {
      fontSize: 7.5,
      color: '#64748b',
    },
  });

  return (
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        {data.personal.photo && (
          <Image src={data.personal.photo} style={styles.photo} />
        )}
        <View style={styles.headerText}>
          <Text style={styles.fullName}>{data.personal.fullName || 'Imię Nazwisko'}</Text>
          <Text style={styles.jobTitle}>{data.personal.jobTitle || 'Stanowisko'}</Text>
        </View>
      </View>

      {/* Body */}
      <View style={styles.body}>
        {/* Left Column (Sidebar) */}
        <View style={styles.sidebar}>
          {/* Contact Details */}
          <View style={styles.section}>
            <Text style={styles.sidebarSectionTitle}>Kontakt</Text>
            {data.personal.email && (
              <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>Email</Text>
                <Text style={styles.contactValue}>{data.personal.email}</Text>
              </View>
            )}
            {data.personal.phone && (
              <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>Telefon</Text>
                <Text style={styles.contactValue}>{data.personal.phone}</Text>
              </View>
            )}
            {data.personal.location && (
              <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>Lokalizacja</Text>
                <Text style={styles.contactValue}>{data.personal.location}</Text>
              </View>
            )}
            {data.personal.website && (
              <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>Strona WWW</Text>
                <Text style={styles.contactValue}>{data.personal.website}</Text>
              </View>
            )}
            {data.personal.linkedin && (
              <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>LinkedIn</Text>
                <Text style={styles.contactValue}>{data.personal.linkedin}</Text>
              </View>
            )}
          </View>

          {/* Skills */}
          {data.skills.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sidebarSectionTitle}>Umiejętności</Text>
              <View style={styles.skillsContainer}>
                {data.skills.map((skill) => (
                  <Text key={skill.id} style={styles.skillTag}>
                    {skill.name}
                  </Text>
                ))}
              </View>
            </View>
          )}

          {/* Languages */}
          {data.languages.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sidebarSectionTitle}>Języki obce</Text>
              {data.languages.map((lang) => (
                <View key={lang.id} style={styles.langRow}>
                  <Text style={styles.langName}>{lang.name}</Text>
                  <Text style={styles.langLevel}>{lang.level}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Right Column (Main Content) */}
        <View style={styles.mainContent}>
          {/* Profile Summary */}
          {data.personal.summary && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Profil zawodowy</Text>
              <Text style={{ fontSize: 8.5, color: '#334155' }}>{data.personal.summary}</Text>
            </View>
          )}

          {/* Experience */}
          {data.experience.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Doświadczenie zawodowe</Text>
              {data.experience.map((exp) => (
                <View key={exp.id} style={styles.item}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemTitle}>{exp.role || 'Stanowisko'}</Text>
                    <Text style={styles.itemDates}>
                      {exp.startDate} {exp.endDate ? `— ${exp.endDate}` : ''}
                    </Text>
                  </View>
                  <Text style={styles.itemSub}>{exp.company || 'Firma'}</Text>
                  {exp.description && <Text style={styles.itemDesc}>{exp.description}</Text>}
                </View>
              ))}
            </View>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Wykształcenie</Text>
              {data.education.map((edu) => (
                <View key={edu.id} style={styles.item}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemTitle}>{edu.degree || 'Kierunek / Tytuł'}</Text>
                    <Text style={styles.itemDates}>
                      {edu.startDate} {edu.endDate ? `— ${edu.endDate}` : ''}
                    </Text>
                  </View>
                  <Text style={styles.itemSub}>{edu.university || 'Uczelnia'}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Certificates */}
          {data.certificates.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Certyfikaty i kursy</Text>
              {data.certificates.map((cert) => (
                <View key={cert.id} style={styles.certItem}>
                  <Text style={styles.certName}>{cert.name}</Text>
                  <Text style={styles.certIssuer}>
                    {cert.issuer} {cert.date ? `| ${cert.date}` : ''}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* Custom Sections */}
          {data.customSections.map((sec) => (
            <View key={sec.id} style={styles.section}>
              <Text style={styles.sectionTitle}>{sec.title || 'Inne'}</Text>
              <Text style={{ fontSize: 8.5, color: '#475569' }}>{sec.content}</Text>
            </View>
          ))}
        </View>
      </View>
    </Page>
  );
}
