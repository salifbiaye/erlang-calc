'use client';

import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Enregistrement des polices (optionnel)
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5Q.ttf', fontWeight: 'normal' },
    { src: 'https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmEU9vAw.ttf', fontWeight: 'bold' },
  ],
});

const styles = StyleSheet.create({
  page: { 
    padding: 40, 
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
  },
  header: { 
    marginBottom: 20, 
    paddingBottom: 10,
    borderBottom: '1px solid #e0e0e0',
  },
  title: { 
    fontSize: 22, 
    marginBottom: 5, 
    fontWeight: 'bold',
    color: '#1a365d',
  },
  subtitle: {
    fontSize: 12,
    color: '#4a5568',
    marginBottom: 3,
  },
  section: { 
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f8fafc',
    borderRadius: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2d3748',
  },
  row: { 
    flexDirection: 'row', 
    marginBottom: 5,
    padding: 5,
    backgroundColor: '#ffffff',
    borderRadius: 3,
  },
  label: { 
    width: 180, 
    fontWeight: 'bold',
    color: '#4a5568',
  },
  value: { 
    flex: 1,
    color: '#2d3748',
  },
  result: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2b6cb0',
    marginTop: 5,
  },
  analysisContent: {
    fontSize: 10,
    lineHeight: 1.4,
  },
  analysisHeading: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
    color: '#2d3748',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    color: '#a0aec0',
    fontSize: 10,
    borderTop: '1px solid #e2e8f0',
    paddingTop: 10,
  },
});

const formatKey = (key: string) => 
  key.replace(/_/g, ' ')
     .replace(/\w\S*/g, txt => 
       txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
     );

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

interface PdfDocumentProps {
  simulation: {
    id: string;
    name?: string;
    type: 'CHANNELS' | 'BLOCKING' | 'TRAFFIC' | 'POPULATION';
    formData: Record<string, any>;
    result: any;
    aiAnalysis?: string;
    createdAt: string;
    updatedAt: string;
    zoneDisplayName?: string;
  };
}

// Composant pour le rendu PDF
const PdfDocument = ({ simulation }: PdfDocumentProps) => {
  const getTypeLabel = () => {
    const types = {
      CHANNELS: 'Calcul de canaux',
      BLOCKING: 'Probabilité de blocage',
      TRAFFIC: 'Trafic supporté',
      POPULATION: 'Population supportée',
    };
    return types[simulation.type] || simulation.type;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* En-tête */}
        <View style={styles.header}>
          <Text style={styles.title}>
            {simulation.name || 'Rapport de simulation'}
          </Text>
          <Text style={styles.subtitle}>
            Type: {getTypeLabel()}
          </Text>
          <Text style={styles.subtitle}>
            Créé le: {formatDate(simulation.createdAt)}
          </Text>
          {simulation.zoneDisplayName && (
            <Text style={styles.subtitle}>
              Zone: {simulation.zoneDisplayName}
            </Text>
          )}
        </View>

        {/* Section Résultat */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Résultat de la simulation</Text>
          <Text style={styles.result}>
            {typeof simulation.result === 'number' 
              ? simulation.result.toLocaleString('fr-FR', { maximumFractionDigits: 4 })
              : String(simulation.result)}
          </Text>
        </View>

        {/* Section Paramètres */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Paramètres utilisés</Text>
          {Object.entries(simulation.formData || {})
            .filter(([key]) => !['rawData', 'chartData'].includes(key))
            .map(([key, value]) => (
              <View key={key} style={styles.row}>
                <Text style={styles.label}>{formatKey(key)}:</Text>
                <Text style={styles.value}>
                  {value === null || value === undefined 
                    ? 'Non défini' 
                    : typeof value === 'object' 
                      ? JSON.stringify(value)
                      : String(value)}
                </Text>
              </View>
            ))}
        </View>

        {/* Section Analyse IA si disponible */}
        {simulation.aiAnalysis && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Analyse des résultats</Text>
            <View>
              {simulation.aiAnalysis.split('\n').map((line, lineIndex) => {
                // Gérer les séparateurs (---)
                if (line.trim() === '---') {
                  return (
                    <View 
                      key={`sep-${lineIndex}`} 
                      style={{ 
                        borderBottomWidth: 1, 
                        borderBottomColor: '#e2e8f0',
                        marginVertical: 12,
                        width: '100%' 
                      }} 
                    />
                  );
                }
                
                // Détecter les titres Markdown (##, ###, ####)
                if (line.startsWith('#### ')) {
                  return (
                    <Text key={`h4-${lineIndex}`} style={{ 
                      fontWeight: 'bold', 
                      fontSize: 10,
                      marginTop: 8, 
                      marginBottom: 2,
                      color: '#4a5568'
                    }}>
                      {line.replace('#### ', '')}
                    </Text>
                  );
                } else if (line.startsWith('### ')) {
                  return (
                    <Text key={`h3-${lineIndex}`} style={{ 
                      fontWeight: 'bold', 
                      fontSize: 12,
                      marginTop: 10, 
                      marginBottom: 4,
                      color: '#2d3748'
                    }}>
                      {line.replace('### ', '')}
                    </Text>
                  );
                } else if (line.startsWith('## ')) {
                  return (
                    <Text key={`h2-${lineIndex}`} style={{ 
                      fontWeight: 'bold', 
                      fontSize: 14,
                      marginTop: 12, 
                      marginBottom: 6,
                      color: '#1a365d'
                    }}>
                      {line.replace('## ', '')}
                    </Text>
                  );
                }
                
                // Traiter le texte en surbrillance (**texte**)
                const parts = [];
                let currentIndex = 0;
                let match;
                const regex = /\*\*(.*?)\*\*/g;
                
                while ((match = regex.exec(line)) !== null) {
                  // Ajouter le texte avant le match
                  if (match.index > currentIndex) {
                    parts.push(line.substring(currentIndex, match.index));
                  }
                  // Ajouter le texte en surbrillance
                  parts.push(
                    <Text 
                      key={`highlight-${lineIndex}-${match.index}`} 
                      style={{ 
                        backgroundColor: '#fef9c3',
                        paddingHorizontal: 2,
                        borderRadius: 2
                      }}
                    >
                      {match[1]}
                    </Text>
                  );
                  currentIndex = match.index + match[0].length;
                }
                
                // Ajouter le reste du texte
                if (currentIndex < line.length) {
                  parts.push(line.substring(currentIndex));
                }
                
                return (
                  <Text key={`line-${lineIndex}`} style={{ marginBottom: 4 }}>
                    {parts.length > 0 ? parts : line}
                  </Text>
                );
              })}
            </View>
          </View>
        )}

        {/* Pied de page */}
        <Text style={styles.footer} fixed>
          Généré avec Erlang Calculator - {new Date().toLocaleDateString('fr-FR')}
        </Text>
      </Page>
    </Document>
  );
};

export default PdfDocument;
