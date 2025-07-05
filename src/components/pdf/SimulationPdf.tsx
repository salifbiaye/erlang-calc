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

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Open Sans',
    backgroundColor: '#FFFFFF',
    position: 'relative',
    paddingBottom: 80, // Espace pour le footer
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
  resultCard: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    padding: 16,
    marginTop: 10,
  },
  resultText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  resultLabel: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 12,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  adviceCard: {
    backgroundColor: '#ECFDF5',
    borderLeft: '4px solid #10B981',
    padding: 12,
    borderRadius: 4,
    marginTop: 15,
  },
  adviceTitle: {
    color: '#065F46',
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 6,
    fontFamily: 'Roboto',
  },
  adviceText: {
    color: '#065F46',
    fontSize: 11,
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
  pageNumber: {
    position: 'absolute',
    bottom: 15,
    right: 40,
    fontSize: 10,
    color: '#9CA3AF',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 15,
  },
});

interface SimulationPdfProps {
  simulation: {
    id: string;
    name?: string;
    type: 'CHANNELS' | 'BLOCKING' | 'TRAFFIC' | 'POPULATION';
    formData: Record<string, any>;
    result: number;
    chartData: any[];
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

const SimulationPdf: React.FC<SimulationPdfProps> = ({ simulation }) => {
  // Log pour le débogage
  console.log('SimulationPdf - Données reçues:', simulation);
  
  // Vérifier si les données nécessaires sont présentes
  if (!simulation) {
    console.error('Erreur: Aucune donnée de simulation disponible');
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <Text>Erreur: Aucune donnée de simulation disponible</Text>
        </Page>
      </Document>
    );
  }
  
  // Vérifier si window est défini (nécessaire pour le rendu côté client)
  if (typeof window === 'undefined') {
    console.log('Rendu côté serveur détecté, retourne un document vide');
    return <div>Génération du PDF en cours...</div>;
  }

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
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.title}>Rapport d'Analyse</Text>
            <Text style={styles.subtitle}>
              {getTypeLabel()} • Généré le {new Date().toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.headerIcon}>{getTypeIcon()}</Text>
          </View>
        </View>

        {/* Section Informations Générales */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations Générales</Text>
          
          <View style={styles.row}>
            <Text style={styles.label}>Nom de la simulation:</Text>
            <Text style={[styles.value, { fontWeight: 'bold' }]}>
              {simulation.name || simulation.zoneDisplayName || simulation.zone?.display_name || 'Sans nom'}
            </Text>
          </View>
          
          {simulation.zoneDisplayName && (
            <View style={styles.row}>
              <Text style={styles.label}>Localisation:</Text>
              <Text style={styles.value}>{simulation.zoneDisplayName}</Text>
            </View>
          )}
          
          <View style={styles.row}>
            <Text style={styles.label}>Type d'analyse:</Text>
            <Text style={styles.value}>
              {simulation.type === 'CHANNELS' ? 'Calcul du nombre de canaux requis' : 
               simulation.type === 'BLOCKING' ? 'Calcul du taux de blocage' : 
               simulation.type === 'TRAFFIC' ? 'Analyse de l\'intensité du trafic' : 
               'Analyse de la taille de population'}
            </Text>
          </View>
          
          <View style={styles.row}>
            <Text style={styles.label}>Identifiant unique:</Text>
            <Text style={[styles.value, { fontFamily: 'monospace', fontSize: 10 }]}>{simulation.id}</Text>
          </View>
          
          <View style={styles.row}>
            <Text style={styles.label}>Date de création:</Text>
            <Text style={styles.value}>{formatDate(simulation.createdAt)}</Text>
          </View>
          
          <View style={styles.row}>
            <Text style={styles.label}>Dernière mise à jour:</Text>
            <Text style={styles.value}>{formatDate(simulation.updatedAt)}</Text>
          </View>
        </View>

        {/* Section Paramètres */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Paramètres de la Simulation</Text>
          
          {simulation.formData && Object.entries(simulation.formData).map(([key, value]) => {
            // Formater les clés pour un affichage plus lisible
            const formatKey = (k: string) => {
              return k
                .split('_')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')
                .replace(/([A-Z])/g, ' $1')
                .trim();
            };
            
            // Formater les valeurs pour un affichage plus lisible
            const formatValue = (v: any) => {
              if (v === null || v === undefined) return 'Non défini';
              if (typeof v === 'boolean') return v ? 'Oui' : 'Non';
              return String(v);
            };
            
            return (
              <View key={key} style={styles.row}>
                <Text style={styles.label}>{formatKey(key)}:</Text>
                <Text style={[styles.value, { fontFamily: 'Roboto' }]}>{formatValue(value)}</Text>
              </View>
            );
          })}
        </View>

        {/* Section Résultats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Résultats de la Simulation</Text>
          
          <View style={styles.resultCard}>
            <Text style={styles.resultLabel}>Résultat</Text>
            <Text style={styles.resultText}>
              {typeof simulation.result === 'number' 
                ? simulation.result.toFixed(2)
                : simulation.result || 'N/A'}
            </Text>
            <Text style={[styles.resultLabel, { marginTop: 8 }]}>
              {simulation.type === 'CHANNELS' ? 'Canaux requis' : 
               simulation.type === 'BLOCKING' ? 'Taux de blocage' : 
               simulation.type === 'TRAFFIC' ? 'Intensité du trafic (Erlang)' : 
               'Taille de population estimée'}
            </Text>
          </View>
          
          {/* Conseils IA */}
          {simulation.aiAnalysis && (
            <View style={styles.adviceCard}>
              <Text style={styles.adviceTitle}>🔍 Analyse et Recommandations</Text>
              <View style={styles.divider} />
              <Text style={styles.adviceText}>
                {simulation.aiAnalysis.split('\n').map((line: string, i: number) => (
                  <Text key={i}>
                    {line}
                    {'\n'}
                  </Text>
                ))}
              </Text>
            </View>
          )}
        </View>

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
