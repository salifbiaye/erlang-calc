import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import { Simulation } from '@/features/simulations/use-simulations';

// Enregistrer les polices
Font.register({
  family: 'Open Sans',
  fonts: [
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf' },
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf', fontWeight: 600 },
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-700.ttf', fontWeight: 700 },
  ],
});

Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf' },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf', fontWeight: 'bold' },
  ],
});

// Enregistrer une police monospace
Font.register({
  family: 'Courier',
  fonts: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Courier/courier-regular.ttf' },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Courier/courier-bold.ttf', fontWeight: 'bold' },
  ],
});

// Fonction utilitaire pour formater les dates
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString('fr-FR', options);
};

// Fonction pour obtenir l'unité en fonction du type de simulation
const getUnitForType = (type: string) => {
  switch(type) {
    case 'CHANNELS': return 'canaux';
    case 'BLOCKING': return '%';
    case 'TRAFFIC': return 'Erlangs';
    case 'POPULATION': return 'habitants';
    default: return '';
  }
};

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Open Sans',
    backgroundColor: '#FFFFFF',
    position: 'relative',
    paddingBottom: 80, // Espace pour le footer
  },
  code: {
    fontFamily: 'Courier',
    backgroundColor: '#F3F4F6',
    padding: '2px 4px',
    borderRadius: 4,
    fontSize: 10,
  },
  header: {
    marginBottom: 25,
    paddingBottom: 15,
    borderBottom: '1px solid #E5E7EB',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    width: 80,
    height: 80,
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIcon: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 5,
    color: '#111827',
    fontFamily: 'Roboto',
  },
  subtitle: {
    fontSize: 11,
    color: '#6B7280',
    letterSpacing: 0.5,
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 16,
    border: '1px solid #E5E7EB',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 700,
    marginBottom: 12,
    color: '#111827',
    fontFamily: 'Roboto',
    borderBottom: '2px solid #3B82F6',
    paddingBottom: 4,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  label: {
    width: 160,
    fontSize: 11,
    color: '#4B5563',
    fontWeight: 600,
    fontFamily: 'Roboto',
  },
  value: {
    flex: 1,
    fontSize: 11,
    color: '#111827',
    lineHeight: 1.4,
  },
  resultContainer: {
    backgroundColor: '#F8FAFC',
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
    marginBottom: 15,
  },
  resultLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 5,
  },
  resultValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  chartContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 15,
  },
  chartTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: '#4B5563',
    marginBottom: 10,
  },
  chartPlaceholder: {
    height: 200,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    border: '1px dashed #D1D5DB',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  chartPlaceholderText: {
    color: '#9CA3AF',
    fontStyle: 'italic',
    textAlign: 'center',
    fontSize: 12,
  },
  analysisText: {
    fontSize: 8,
    lineHeight: 1.6,
    color: '#4B5563',
    textAlign: 'justify',
  },
  noteText: {
    fontSize: 10,
    color: '#6B7280',
    fontStyle: 'italic',
    lineHeight: 1.5,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 40,
    right: 40,
    fontSize: 9,
    color: '#9CA3AF',
    textAlign: 'center',
    borderTop: '1px solid #E5E7EB',
    paddingTop: 10,
  },
  footerText: {
    fontSize: 9,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  pageNumber: {
    position: 'absolute',
    bottom: 15,
    right: 40,
    fontSize: 10,
    color: '#9CA3AF',
  },
});

interface SimulationPdfProps {
  simulation: {
    id: string;
    name?: string;
    type: 'CHANNELS' | 'BLOCKING' | 'TRAFFIC' | 'POPULATION';
    formData: Record<string, any>;
    result: any; // Plus flexible que number pour gérer différents types de résultats
    chartData?: any[]; // Rendre optionnel
    aiAnalysis?: string;
    createdAt: string;
    updatedAt: string;
    zoneDisplayName?: string;
    zone?: {
      lat: number;
      lon: number;
      display_name: string;
    } | null;
  };
}

// Composant pour afficher une paire clé-valeur
const InfoRow = ({ label, value, isCode = false }: { label: string; value: React.ReactNode; isCode?: boolean }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}:</Text>
    {isCode ? (
      <Text style={styles.code}>{value}</Text>
    ) : (
      <Text style={styles.value}>{value}</Text>
    )}
  </View>
);

// Composant pour afficher une section avec un titre
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const SimulationPdf: React.FC<SimulationPdfProps> = ({ simulation }) => {
  // Vérifier si les données nécessaires sont présentes
  if (!simulation) {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <Text>Erreur: Aucune donnée de simulation disponible</Text>
        </Page>
      </Document>
    );
  }
  
  const unit = getUnitForType(simulation.type);
  
  // Formater les clés pour un affichage plus lisible
  const formatKey = (key: string): string => {
    // Remplacer les underscores par des espaces et mettre en majuscule la première lettre
    return key
      .replace(/_/g, ' ')
      .replace(/\w\S*/g, (txt) => 
        txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      );
  };
  
  // Ne plus vérifier window pour permettre le rendu côté serveur
  // Le composant sera rendu côté client par react-pdf

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

  const getTypeLabel = () => {
    switch(simulation.type) {
      case 'CHANNELS': return 'Canaux Requis';
      case 'TRAFFIC': return 'Intensité du Trafic';
      case 'BLOCKING': return 'Taux de Blocage';
      case 'POPULATION': return 'Taille de Population';
      default: return 'Simulation';
    }
  };

  const getTypeIcon = () => {
    switch(simulation.type) {
      case 'CHANNELS': return '📊';
      case 'TRAFFIC': return '🚦';
      case 'BLOCKING': return '⏱️';
      case 'POPULATION': return '👥';
      default: return '📋';
    }
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* En-tête avec logo et informations */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.title}>
              {simulation.name || `Simulation ${simulation.type.toLowerCase()}`}
            </Text>
            <Text style={styles.subtitle}>
              Créée le {formatDate(simulation.createdAt)}
              {simulation.updatedAt !== simulation.createdAt && 
                ` • Dernière mise à jour: ${formatDate(simulation.updatedAt)}`}
            </Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.headerIcon}>
              {simulation.type.charAt(0)}
            </Text>
          </View>
        </View>

        {/* Section Informations Générales */}
        <Section title="Informations Générales">
          <InfoRow 
            label="Type de simulation" 
            value={{
              'CHANNELS': 'Estimation du nombre de canaux',
              'BLOCKING': 'Calcul du taux de blocage',
              'TRAFFIC': 'Analyse de trafic',
              'POPULATION': 'Estimation de population'
            }[simulation.type] || simulation.type} 
          />
          
          <InfoRow 
            label="ID" 
            value={simulation.id} 
            isCode
          />
          
          {simulation.zoneDisplayName && (
            <InfoRow 
              label="Zone d'étude" 
              value={simulation.zoneDisplayName} 
            />
          )}
        </Section>

        {/* Section Paramètres */}
        <Section title="Paramètres de la Simulation">
          {Object.entries(simulation.formData || {}).map(([key, value]) => {
            // Formater la clé pour un affichage plus lisible
            const formatKey = (k: string) => {
              return k
                .split('_')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(' ');
            };
            
            // Formater les valeurs pour un affichage plus lisible
            const formatValue = (v: any) => {
              if (v === null || v === undefined) return 'Non spécifié';
              if (typeof v === 'boolean') return v ? 'Oui' : 'Non';
              if (Array.isArray(v)) return v.join(', ');
              if (typeof v === 'object') return JSON.stringify(v);
              return String(v);
            };
            
            return (
              <InfoRow
                key={key}
                label={formatKey(key)}
                value={formatValue(value)}
              />
            );
          })}
        </Section>

        {/* Section Résultats */}
        <Section title="Résultats">
          <View style={[styles.resultContainer, { marginBottom: 10 }]}>
            <Text style={styles.resultLabel}>Résultat principal:</Text>
            <Text style={styles.resultValue}>
              {simulation.result.toLocaleString('fr-FR')} {unit}
            </Text>
          </View>
          
          {/* Section Résumé des paramètres */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Résumé des paramètres</Text>
            {simulation.formData && Object.entries(simulation.formData).map(([key, value]) => {
              // Ne pas afficher les champs vides ou les données brutes
              if (value === null || value === undefined || 
                  key === 'rawData' || key === 'chartData' || 
                  (typeof value === 'object' && Object.keys(value).length === 0)) {
                return null;
              }
              
              return (
                <View key={key} style={styles.row}>
                  <Text style={styles.label}>{formatKey(key)}:</Text>
                  <Text style={styles.value}>
                    {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                  </Text>
                </View>
              );
            })}
          </View>
        </Section>

        {/* Section Analyse IA */}
        {simulation.aiAnalysis && (
          <Section title="Analyse IA">
            <Text >
              {simulation.aiAnalysis}
            </Text>
          </Section>
        )}

        {/* Notes et commentaires */}
        <Section title="Notes">
          <Text style={styles.noteText}>
            Ce document a été généré automatiquement par le système ErlangCalc.
            Pour toute question, veuillez vous référer à l'ID de simulation ci-dessus.
          </Text>
        </Section>

        <View style={styles.footer}>
          <Text>Document généré par Erlang Calculator - {new Date().getFullYear()}</Text>
          <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
            `Page ${pageNumber} sur ${totalPages}`
          )} fixed />
        </View>
      </Page>
    </Document>
  );
};

export default SimulationPdf;
