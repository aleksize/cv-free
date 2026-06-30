import { Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import type { CvData } from '../types/cv';

interface TemplateProps {
  data: CvData;
}

export default function ExecutivePDF({ data }: TemplateProps) {
  const accent = data.colorPreset || '#1e3a8a'; // Default to deep navy if empty
  const font = data.font || 'Inter';

  const pageMargin = data.margin === 'small' ? 20 : data.margin === 'large' ? 36 : 28;
  const itemGap = data.spacing === 'small' ? 3 : data.spacing === 'large' ? 8 : 5;
  const sectionGap = data.spacing === 'small' ? 8 : data.spacing === 'large' ? 16 : 12;

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#ffffff',
      fontFamily: font,
      fontSize: 9,
      color: '#334155',
      lineHeight: 1.4,
    },
    sidebar: {
      width: 190,
      backgroundColor: '#0f172a', // Premium deep dark navy/slate
      color: '#f8fafc',
      padding: pageMargin,
      paddingTop: 32,
      paddingBottom: 40,
      flexDirection: 'column',
      gap: sectionGap,
      height: '100%',
    },
    mainContent: {
      flex: 1,
      padding: pageMargin,
      paddingTop: 32,
      paddingBottom: 70, // Extra space at bottom for RODO
      flexDirection: 'column',
      gap: sectionGap,
      height: '100%',
    },
    photoContainer: {
      alignItems: 'center',
      marginBottom: 10,
    },
    photo: {
      width: 80,
      height: 80,
      borderRadius: 40,
      objectFit: 'cover',
      borderWidth: 2,
      borderColor: accent,
    },
    fullName: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#0f172a',
      letterSpacing: -0.5,
      lineHeight: 1.1,
    },
    jobTitle: {
      fontSize: 11,
      fontWeight: 'semibold',
      color: accent,
      marginTop: 4,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    section: {
      marginBottom: 2,
    },
    sectionTitle: {
      fontSize: 10,
      fontWeight: 'bold',
      color: '#0f172a',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      borderBottomWidth: 1,
      borderBottomColor: '#e2e8f0',
      paddingBottom: 3,
      marginBottom: 8,
    },
    sidebarSectionTitle: {
      fontSize: 9.5,
      fontWeight: 'bold',
      color: '#ffffff',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      borderBottomWidth: 1,
      borderBottomColor: '#334155',
      paddingBottom: 3,
      marginBottom: 8,
    },
    contactList: {
      flexDirection: 'column',
      gap: 6,
    },
    contactItem: {
      flexDirection: 'column',
    },
    contactLabel: {
      fontSize: 7,
      color: '#94a3b8',
      textTransform: 'uppercase',
      fontWeight: 'semibold',
      marginBottom: 1,
    },
    contactValue: {
      fontSize: 8.5,
      color: '#f1f5f9',
    },
    sidebarText: {
      fontSize: 8.5,
      color: '#cbd5e1',
    },
    skillTag: {
      fontSize: 7.5,
      backgroundColor: '#1e293b',
      color: '#f1f5f9',
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 3,
      marginBottom: 3,
      marginRight: 3,
    },
    skillsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 2,
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
      fontSize: 8,
      color: '#475569',
      textAlign: 'justify',
    },
    certItem: {
      marginBottom: 5,
    },
    certName: {
      fontSize: 8.5,
      fontWeight: 'bold',
      color: '#f8fafc',
    },
    certIssuer: {
      fontSize: 7.5,
      color: '#94a3b8',
    },
    mainCertItem: {
      marginBottom: itemGap,
    },
    mainCertName: {
      fontSize: 9,
      fontWeight: 'bold',
      color: '#0f172a',
    },
    mainCertIssuer: {
      fontSize: 8,
      color: '#64748b',
    },
    rodoContainer: {
      position: 'absolute',
      bottom: 24,
      left: 190 + pageMargin,
      right: pageMargin,
      borderTopWidth: 1,
      borderTopColor: '#e2e8f0',
      paddingTop: 8,
    },
    rodoText: {
      fontSize: 6.5,
      color: '#64748b',
      textAlign: 'justify',
    },
    watermark: {
      position: 'absolute',
      bottom: 8,
      left: 0,
      right: 0,
      textAlign: 'center',
      fontSize: 6.5,
      color: '#cbd5e1',
    },
  });

  return (
    <Page size="A4" style={styles.page}>
      {/* Sidebar: Left Column (Dark Slate Background) */}
      <View style={styles.sidebar}>
        {/* Profile Photo */}
        {data.personal.photo && (
          <View style={styles.photoContainer}>
            <Image src={data.personal.photo} style={styles.photo} />
          </View>
        )}

        {/* Contact Info */}
        <View style={styles.section}>
          <Text style={styles.sidebarSectionTitle}>Kontakt</Text>
          <View style={styles.contactList}>
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

            {data.personal.linkedin && (
              <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>LinkedIn</Text>
                <Text style={styles.contactValue}>
                  {data.personal.linkedin.replace(/https?:\/\/(www\.)?linkedin\.com\/in\//, '')}
                </Text>
              </View>
            )}
            {data.personal.website && (
              <View style={styles.contactItem}>
                <Text style={styles.contactLabel}>Portfolio</Text>
                <Text style={styles.contactValue}>
                  {data.personal.website.replace(/https?:\/\/(www\.)?/, '')}
                </Text>
              </View>
            )}
          </View>
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
            <Text style={styles.sidebarSectionTitle}>Języki</Text>
            <View style={styles.contactList}>
              {data.languages.map((lang) => (
                <View key={lang.id} style={{ marginBottom: 4 }}>
                  <Text style={{ fontSize: 8.5, fontWeight: 'bold', color: '#f8fafc' }}>
                    {lang.name}
                  </Text>
                  {lang.level && (
                    <Text style={{ fontSize: 7.5, color: '#94a3b8' }}>{lang.level}</Text>
                  )}
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Sidebar Certificates if space allows */}
        {data.certificates.length > 0 && data.certificates.length <= 3 && (
          <View style={styles.section}>
            <Text style={styles.sidebarSectionTitle}>Certyfikaty</Text>
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
      </View>

      {/* Main Content: Right Column */}
      <View style={styles.mainContent}>
        {/* Name and Title */}
        <View style={{ marginBottom: 12 }}>
          <Text style={styles.fullName}>{data.personal.fullName || 'Imię i Nazwisko'}</Text>
          {data.personal.jobTitle && (
            <Text style={styles.jobTitle}>{data.personal.jobTitle}</Text>
          )}
        </View>

        {/* Profile Summary */}
        {data.personal.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Podsumowanie zawodowe</Text>
            <Text style={styles.itemDesc}>{data.personal.summary}</Text>
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

        {/* Certificates if not shown in sidebar */}
        {data.certificates.length > 3 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certyfikaty i kursy</Text>
            {data.certificates.map((cert) => (
              <View key={cert.id} style={styles.mainCertItem}>
                <Text style={styles.mainCertName}>{cert.name}</Text>
                <Text style={styles.mainCertIssuer}>
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
            <Text style={styles.itemDesc}>{sec.content}</Text>
          </View>
        ))}
      </View>

      {/* RODO Clause */}
      {data.showRodo && data.rodoClause && (
        <View style={styles.rodoContainer}>
          <Text style={styles.rodoText}>{data.rodoClause}</Text>
        </View>
      )}

      {/* Watermark */}
      {data.showWatermark && (
        <Text style={styles.watermark} fixed>
          Wygenerowano przez www.cv-free.pl
        </Text>
      )}
    </Page>
  );
}
