import { Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import type { CvData } from '../types/cv';

interface TemplateProps {
  data: CvData;
}

export default function TechnicalPDF({ data }: TemplateProps) {
  const accent = data.colorPreset || '#0ea5e9';
  const font = data.font || 'Inter';

  const pageMargin = data.margin === 'small' ? 18 : data.margin === 'large' ? 34 : 26;
  const itemGap = data.spacing === 'small' ? 2 : data.spacing === 'large' ? 7 : 4;
  const sectionGap = data.spacing === 'small' ? 6 : data.spacing === 'large' ? 14 : 10;

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#ffffff',
      padding: pageMargin,
      fontFamily: font,
      fontSize: 8.5,
      color: '#1f2937',
      lineHeight: 1.3,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      borderBottomWidth: 1.5,
      borderBottomColor: '#d1d5db',
      paddingBottom: 8,
      marginBottom: sectionGap,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    photo: {
      width: 80,
      height: 80,
      borderRadius: 40,
      objectFit: 'cover',
    },
    fullName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#111827',
      lineHeight: 1.1,
    },
    jobTitle: {
      fontSize: 10,
      fontWeight: 'semibold',
      color: accent,
      marginTop: 4,
      lineHeight: 1.2,
    },
    contactCol: {
      alignItems: 'flex-end',
      fontSize: 8,
      color: '#4b5563',
      gap: 2,
    },
    section: {
      marginBottom: sectionGap,
    },
    sectionTitle: {
      fontSize: 9,
      fontWeight: 'bold',
      color: '#111827',
      textTransform: 'uppercase',
      backgroundColor: '#f3f4f6',
      paddingHorizontal: 6,
      paddingVertical: 3,
      borderLeftWidth: 3,
      borderLeftColor: accent,
      marginBottom: 5,
    },
    summaryText: {
      fontSize: 8.5,
      color: '#374151',
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
      color: '#111827',
    },
    itemDates: {
      fontSize: 8,
      color: '#6b7280',
    },
    itemSub: {
      fontSize: 8,
      color: '#4b5563',
      fontWeight: 'semibold',
    },
    itemDesc: {
      fontSize: 8,
      color: '#374151',
      marginTop: 2,
      whiteSpace: 'pre-wrap',
    },
    skillsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 4,
    },
    skillItem: {
      fontSize: 8,
      backgroundColor: '#f3f4f6',
      borderWidth: 0.5,
      borderColor: '#e5e7eb',
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 3,
      color: '#1f2937',
    },
    grid2Col: {
      flexDirection: 'row',
      gap: 16,
    },
    gridCol: {
      flex: 1,
    },
    langRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 3,
    },
    langName: {
      fontSize: 8,
      fontWeight: 'semibold',
    },
    langLevel: {
      fontSize: 8,
      color: '#6b7280',
    },
    rodoContainer: {
      marginTop: 'auto',
      paddingTop: 6,
      borderTopWidth: 0.5,
      borderTopColor: '#cbd5e1',
    },
    rodoText: {
      fontSize: 6.5,
      color: '#4b5563',
      textAlign: 'justify',
      lineHeight: 1.25,
      fontFamily: font,
    },
    watermark: {
      position: 'absolute',
      bottom: 12,
      left: 0,
      right: 0,
      textAlign: 'center',
      fontSize: 7.5,
      color: '#9ca3af',
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

        <View style={styles.contactCol}>
          {data.personal.email && <Text>{data.personal.email}</Text>}
          {data.personal.phone && <Text>{data.personal.phone}</Text>}
          {data.personal.location && <Text>{data.personal.location}</Text>}
          {data.personal.website && <Text>{data.personal.website}</Text>}
          {data.personal.linkedin && <Text>{data.personal.linkedin}</Text>}
        </View>
      </View>

      {/* Summary */}
      {data.personal.summary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Opis zawodowy</Text>
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
          <Text style={styles.sectionTitle}>Edukacja</Text>
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

      {/* Two column grid */}
      <View style={styles.grid2Col}>
        {/* Left Column: Skills & Languages */}
        {(data.skills.length > 0 || data.languages.length > 0) && (
          <View style={styles.gridCol}>
            {data.skills.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Kluczowe umiejętności</Text>
                <View style={styles.skillsGrid}>
                  {data.skills.map((skill) => (
                    <Text key={skill.id} style={styles.skillItem}>
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
                  <View key={lang.id} style={styles.langRow}>
                    <Text style={styles.langName}>{lang.name}</Text>
                    <Text style={styles.langLevel}>{lang.level}</Text>
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
                <Text style={styles.sectionTitle}>Certyfikaty</Text>
                {data.certificates.map((cert) => (
                  <View key={cert.id} style={{ marginBottom: 4 }}>
                    <Text style={{ fontSize: 8, fontWeight: 'bold' }}>{cert.name}</Text>
                    <Text style={{ fontSize: 7.5, color: '#4b5563' }}>
                      {cert.issuer} {cert.date ? `(${cert.date})` : ''}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {data.customSections.map((sec) => (
              <View key={sec.id} style={styles.section}>
                <Text style={styles.sectionTitle}>{sec.title || 'Inne'}</Text>
                <Text style={{ fontSize: 8, color: '#374151' }}>{sec.content}</Text>
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
