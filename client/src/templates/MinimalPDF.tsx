import { Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import type { CvData } from '../types/cv';

interface TemplateProps {
  data: CvData;
}

export default function MinimalPDF({ data }: TemplateProps) {
  const font = data.font || 'Inter';

  const pageMargin = data.margin === 'small' ? 30 : data.margin === 'large' ? 50 : 40;
  const itemGap = data.spacing === 'small' ? 3 : data.spacing === 'large' ? 8 : 5;
  const sectionGap = data.spacing === 'small' ? 8 : data.spacing === 'large' ? 18 : 12;

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#ffffff',
      padding: pageMargin,
      fontFamily: font,
      fontSize: 9,
      color: '#27272a',
      lineHeight: 1.4,
    },
    header: {
      marginBottom: sectionGap + 6,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    photo: {
      width: 50,
      height: 50,
      borderRadius: 4,
      objectFit: 'cover',
    },
    fullName: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#09090b',
      letterSpacing: -0.5,
      lineHeight: 1.1,
    },
    jobTitle: {
      fontSize: 10,
      fontWeight: 'medium',
      color: '#71717a',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      marginTop: 4,
      lineHeight: 1.2,
    },
    contactInfo: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      marginTop: 8,
      fontSize: 8,
      color: '#71717a',
    },
    section: {
      marginBottom: sectionGap,
    },
    sectionTitle: {
      fontSize: 8.5,
      fontWeight: 'bold',
      color: '#09090b',
      textTransform: 'uppercase',
      letterSpacing: 1,
      borderBottomWidth: 1,
      borderBottomColor: '#e4e4e7',
      paddingBottom: 3,
      marginBottom: 6,
    },
    summaryText: {
      fontSize: 8.5,
      color: '#3f3f46',
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
      fontSize: 9,
      fontWeight: 'bold',
      color: '#09090b',
    },
    itemDates: {
      fontSize: 8,
      color: '#a1a1aa',
    },
    itemSub: {
      fontSize: 8,
      color: '#71717a',
      marginTop: 1,
    },
    itemDesc: {
      fontSize: 8,
      color: '#3f3f46',
      marginTop: 2,
      whiteSpace: 'pre-wrap',
    },
    skillsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 4,
    },
    skillTag: {
      fontSize: 7.5,
      borderWidth: 1,
      borderColor: '#e4e4e7',
      paddingHorizontal: 6,
      paddingVertical: 1.5,
      borderRadius: 2,
      color: '#27272a',
    },
    grid2Col: {
      flexDirection: 'row',
      gap: 20,
    },
    gridCol: {
      flex: 1,
    },
    rodoContainer: {
      marginTop: 'auto',
      paddingTop: 6,
      borderTopWidth: 0.5,
      borderTopColor: '#e4e4e7',
    },
    rodoText: {
      fontSize: 6.5,
      color: '#71717a',
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
      color: '#a1a1aa',
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
          <View>
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
          <Text style={styles.sectionTitle}>O mnie</Text>
          <Text style={styles.summaryText}>{data.personal.summary}</Text>
        </View>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Doświadczenie</Text>
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
          <Text style={styles.sectionTitle}>Edukacja</Text>
          {data.education.map((edu) => (
            <View key={edu.id} style={styles.item}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemTitle}>{edu.degree || 'Kierunek'}</Text>
                <Text style={styles.itemDates}>
                  {edu.startDate} {edu.endDate ? `— ${edu.endDate}` : ''}
                </Text>
              </View>
              <Text style={styles.itemSub}>{edu.university || 'Uczelnia'}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Grid */}
      <View style={styles.grid2Col}>
        {/* Skills & Languages */}
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
                <Text style={styles.sectionTitle}>Języki</Text>
                {data.languages.map((lang) => (
                  <View key={lang.id} style={{ marginBottom: 3, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 8, fontWeight: 'semibold' }}>{lang.name}</Text>
                    <Text style={{ fontSize: 7.5, color: '#71717a' }}>{lang.level}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}

        {/* Certificates & Custom Sections */}
        {(data.certificates.length > 0 || data.customSections.length > 0) && (
          <View style={styles.gridCol}>
            {data.certificates.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Certyfikaty</Text>
                {data.certificates.map((cert) => (
                  <View key={cert.id} style={{ marginBottom: 4 }}>
                    <Text style={{ fontSize: 8, fontWeight: 'bold' }}>{cert.name}</Text>
                    <Text style={{ fontSize: 7.5, color: '#71717a' }}>
                      {cert.issuer} {cert.date ? `(${cert.date})` : ''}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {data.customSections.map((sec) => (
              <View key={sec.id} style={styles.section}>
                <Text style={styles.sectionTitle}>{sec.title || 'Inne'}</Text>
                <Text style={{ fontSize: 8, color: '#3f3f46' }}>{sec.content}</Text>
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
