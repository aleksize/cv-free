import { Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import type { CvData } from '../types/cv';

interface TemplateProps {
  data: CvData;
}

export default function ClassicPDF({ data }: TemplateProps) {
  const accent = data.colorPreset || '#0ea5e9';
  const font = data.font || 'Inter';

  // Margins and padding based on settings
  const pageMargin = data.margin === 'small' ? 24 : data.margin === 'large' ? 44 : 34;
  const itemGap = data.spacing === 'small' ? 3 : data.spacing === 'large' ? 8 : 5;
  const sectionGap = data.spacing === 'small' ? 8 : data.spacing === 'large' ? 16 : 12;

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#ffffff',
      padding: pageMargin,
      fontFamily: font,
      fontSize: 10,
      color: '#1e293b',
      lineHeight: 1.4,
    },
    header: {
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#e2e8f0',
      paddingBottom: 12,
      marginBottom: sectionGap,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
    },
    photo: {
      width: 50,
      height: 50,
      borderRadius: 25,
      objectFit: 'cover',
    },
    fullName: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#0f172a',
      textTransform: 'uppercase',
      letterSpacing: 1,
    },
    jobTitle: {
      fontSize: 12,
      fontWeight: 'semibold',
      color: accent,
      marginTop: 2,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    contactInfo: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: 10,
      marginTop: 8,
      fontSize: 8.5,
      color: '#64748b',
    },
    section: {
      marginBottom: sectionGap,
    },
    sectionTitle: {
      fontSize: 10,
      fontWeight: 'bold',
      color: '#0f172a',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      borderBottomWidth: 1,
      borderBottomColor: accent,
      paddingBottom: 2,
      marginBottom: 6,
    },
    summaryText: {
      fontSize: 9,
      color: '#334155',
    },
    item: {
      marginBottom: itemGap,
    },
    itemHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      fontWeight: 'bold',
    },
    itemTitle: {
      fontSize: 9.5,
      fontWeight: 'bold',
      color: '#0f172a',
    },
    itemSub: {
      fontSize: 8.5,
      color: '#64748b',
      fontWeight: 'semibold',
    },
    itemDates: {
      fontSize: 8.5,
      color: '#64748b',
    },
    itemDesc: {
      fontSize: 8.5,
      color: '#475569',
      marginTop: 2,
      whiteSpace: 'pre-wrap',
    },
    skillsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 4,
    },
    skillTag: {
      fontSize: 8,
      backgroundColor: '#f1f5f9',
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 4,
      color: '#334155',
    },
    grid2Col: {
      flexDirection: 'row',
      gap: 16,
    },
    gridCol: {
      flex: 1,
    },
    rodoContainer: {
      marginTop: 'auto',
      paddingTop: 6,
      borderTopWidth: 0.5,
      borderTopColor: '#cbd5e1',
    },
    rodoText: {
      fontSize: 6.5,
      color: '#64748b',
      textAlign: 'justify',
      lineHeight: 1.25,
    },
    watermark: {
      position: 'absolute',
      bottom: 12,
      left: 0,
      right: 0,
      textAlign: 'center',
      fontSize: 7.5,
      color: '#94a3b8',
      fontFamily: font,
    },
  });

  return (
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          {data.personal.photo && (
            <Image src={data.personal.photo} style={styles.photo} />
          )}
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.fullName}>{data.personal.fullName || 'Imię Nazwisko'}</Text>
            <Text style={styles.jobTitle}>{data.personal.jobTitle || 'Stanowisko'}</Text>
          </View>
        </View>
        
        <View style={styles.contactInfo}>
          {data.personal.email && <Text>{data.personal.email}</Text>}
          {data.personal.phone && <Text>•  {data.personal.phone}</Text>}
          {data.personal.location && <Text>•  {data.personal.location}</Text>}
          {data.personal.website && <Text>•  {data.personal.website}</Text>}
          {data.personal.linkedin && <Text>•  {data.personal.linkedin}</Text>}
        </View>
      </View>

      {/* Summary */}
      {data.personal.summary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profil zawodowy</Text>
          <Text style={styles.summaryText}>{data.personal.summary}</Text>
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

      {/* Two Columns for Skills / Languages & Certificates */}
      <View style={styles.grid2Col}>
        {/* Left Column: Skills & Languages */}
        {(data.skills.length > 0 || data.languages.length > 0) && (
          <View style={styles.gridCol}>
            {data.skills.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Umiejętności</Text>
                <View style={styles.skillsContainer}>
                  {data.skills.map((skill) => (
                    <Text key={skill.id} style={styles.skillTag}>
                      {skill.name}
                    </Text>
                  ))}
                </View>
              </View>
            )}

            {data.languages.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Języki obce</Text>
                {data.languages.map((lang) => (
                  <View key={lang.id} style={{ marginBottom: 3, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 8.5, fontWeight: 'bold' }}>{lang.name}</Text>
                    <Text style={{ fontSize: 8, color: '#64748b' }}>{lang.level}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}

        {/* Right Column: Certificates & Custom Sections */}
        {(data.certificates.length > 0 || data.customSections.length > 0) && (
          <View style={styles.gridCol}>
            {data.certificates.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Certyfikaty i kursy</Text>
                {data.certificates.map((cert) => (
                  <View key={cert.id} style={{ marginBottom: 4 }}>
                    <Text style={{ fontSize: 8.5, fontWeight: 'bold', color: '#0f172a' }}>{cert.name}</Text>
                    <Text style={{ fontSize: 8, color: '#64748b' }}>
                      {cert.issuer} {cert.date ? `(${cert.date})` : ''}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {data.customSections.map((sec) => (
              <View key={sec.id} style={styles.section}>
                <Text style={styles.sectionTitle}>{sec.title || 'Inne'}</Text>
                <Text style={{ fontSize: 8.5, color: '#475569' }}>{sec.content}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      {data.showRodo && data.rodoClause && (
        <View style={styles.rodoContainer}>
          <Text style={styles.rodoText}>{data.rodoClause}</Text>
        </View>
      )}

      {data.showWatermark && (
        <Text style={styles.watermark} fixed>
          Wygenerowano przez www.cv-free.pl
        </Text>
      )}
    </Page>
  );
}
