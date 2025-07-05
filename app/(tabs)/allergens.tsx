import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Shield, TriangleAlert as AlertTriangle, CircleAlert as AlertCircle, Info, Plus, Settings, ChevronRight, Bell, BookOpen } from 'lucide-react-native';

const allergenData = [
  {
    id: 1,
    name: 'Peanuts',
    severity: 'severe',
    enabled: true,
    description: 'Tree nuts and peanut-based products',
    commonSources: ['Peanut butter', 'Trail mix', 'Thai cuisine', 'Baked goods'],
    alternatives: ['Sunflower seed butter', 'Tahini', 'Soy butter'],
  },
  {
    id: 2,
    name: 'Shellfish',
    severity: 'severe',
    enabled: true,
    description: 'Crustaceans and mollusks',
    commonSources: ['Shrimp', 'Crab', 'Lobster', 'Oysters', 'Mussels'],
    alternatives: ['Fish', 'Chicken', 'Tofu', 'Tempeh'],
  },
  {
    id: 3,
    name: 'Dairy',
    severity: 'moderate',
    enabled: true,
    description: 'Milk and milk-based products',
    commonSources: ['Milk', 'Cheese', 'Yogurt', 'Butter', 'Cream'],
    alternatives: ['Almond milk', 'Oat milk', 'Coconut milk', 'Vegan cheese'],
  },
  {
    id: 4,
    name: 'Gluten',
    severity: 'mild',
    enabled: false,
    description: 'Wheat, barley, rye, and related grains',
    commonSources: ['Bread', 'Pasta', 'Beer', 'Soy sauce', 'Seasonings'],
    alternatives: ['Rice', 'Quinoa', 'Gluten-free oats', 'Almond flour'],
  },
  {
    id: 5,
    name: 'Eggs',
    severity: 'moderate',
    enabled: true,
    description: 'Chicken eggs and egg-based products',
    commonSources: ['Mayonnaise', 'Baked goods', 'Pasta', 'Breakfast items'],
    alternatives: ['Flax eggs', 'Aquafaba', 'Chia seeds', 'Applesauce'],
  },
];

const severityConfig = {
  severe: {
    color: '#FF3B30',
    backgroundColor: '#FFE5E5',
    icon: AlertTriangle,
    label: 'Severe - Life threatening',
  },
  moderate: {
    color: '#FF9500',
    backgroundColor: '#FFF4E6',
    icon: AlertCircle,
    label: 'Moderate - Avoid',
  },
  mild: {
    color: '#34C759',
    backgroundColor: '#E8F5E8',
    icon: Info,
    label: 'Mild - Monitor',
  },
};

export default function AllergensScreen() {
  const [allergens, setAllergens] = useState(allergenData);
  const [notifications, setNotifications] = useState(true);
  const [strictMode, setStrictMode] = useState(false);

  const toggleAllergen = (id: number) => {
    setAllergens(prev => 
      prev.map(allergen => 
        allergen.id === id 
          ? { ...allergen, enabled: !allergen.enabled }
          : allergen
      )
    );
  };

  const getEnabledAllergens = () => {
    return allergens.filter(allergen => allergen.enabled);
  };

  const getSeverityCount = (severity: string) => {
    return allergens.filter(allergen => allergen.enabled && allergen.severity === severity).length;
  };

  const renderAllergenCard = (allergen: any) => {
    const config = severityConfig[allergen.severity as keyof typeof severityConfig];
    const IconComponent = config.icon;

    return (
      <TouchableOpacity key={allergen.id} style={styles.allergenCard}>
        <View style={styles.allergenHeader}>
          <View style={styles.allergenInfo}>
            <View style={[styles.allergenIcon, { backgroundColor: config.backgroundColor }]}>
              <IconComponent size={20} color={config.color} />
            </View>
            <View style={styles.allergenDetails}>
              <Text style={styles.allergenName}>{allergen.name}</Text>
              <Text style={styles.allergenDescription}>{allergen.description}</Text>
              <View style={[styles.severityBadge, { backgroundColor: config.backgroundColor }]}>
                <Text style={[styles.severityText, { color: config.color }]}>
                  {config.label}
                </Text>
              </View>
            </View>
          </View>
          <Switch
            value={allergen.enabled}
            onValueChange={() => toggleAllergen(allergen.id)}
            thumbColor={Platform.OS === 'ios' ? '#FFFFFF' : allergen.enabled ? config.color : '#C7C7CC'}
            trackColor={{ false: '#E5E5E7', true: config.color }}
          />
        </View>
        
        {allergen.enabled && (
          <View style={styles.allergenExpanded}>
            <View style={styles.sourcesSection}>
              <Text style={styles.sectionTitle}>Common Sources</Text>
              <View style={styles.tagContainer}>
                {allergen.commonSources.map((source: string, index: number) => (
                  <View key={index} style={styles.sourceTag}>
                    <Text style={styles.sourceText}>{source}</Text>
                  </View>
                ))}
              </View>
            </View>
            
            <View style={styles.alternativesSection}>
              <Text style={styles.sectionTitle}>Safe Alternatives</Text>
              <View style={styles.tagContainer}>
                {allergen.alternatives.map((alternative: string, index: number) => (
                  <View key={index} style={[styles.alternativeTag, { backgroundColor: config.backgroundColor }]}>
                    <Text style={[styles.alternativeText, { color: config.color }]}>{alternative}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Allergen Safety</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={24} color="#8E8E93" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <Shield size={24} color="#FF6B35" />
            <Text style={styles.summaryTitle}>Safety Overview</Text>
          </View>
          <View style={styles.summaryStats}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Active Allergens</Text>
              <Text style={styles.summaryValue}>{getEnabledAllergens().length}</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Severe</Text>
              <Text style={[styles.summaryValue, { color: '#FF3B30' }]}>
                {getSeverityCount('severe')}
              </Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Moderate</Text>
              <Text style={[styles.summaryValue, { color: '#FF9500' }]}>
                {getSeverityCount('moderate')}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.settingsSection}>
          <Text style={styles.sectionHeader}>Safety Settings</Text>
          <View style={styles.settingsCard}>
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Bell size={20} color="#8E8E93" />
                <View style={styles.settingDetails}>
                  <Text style={styles.settingTitle}>Allergen Notifications</Text>
                  <Text style={styles.settingDescription}>
                    Get alerts when allergens are detected in recipes
                  </Text>
                </View>
              </View>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                thumbColor={Platform.OS === 'ios' ? '#FFFFFF' : notifications ? '#FF6B35' : '#C7C7CC'}
                trackColor={{ false: '#E5E5E7', true: '#FF6B35' }}
              />
            </View>
            
            <View style={styles.settingDivider} />
            
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <AlertTriangle size={20} color="#8E8E93" />
                <View style={styles.settingDetails}>
                  <Text style={styles.settingTitle}>Strict Mode</Text>
                  <Text style={styles.settingDescription}>
                    Hide recipes with any trace of allergens
                  </Text>
                </View>
              </View>
              <Switch
                value={strictMode}
                onValueChange={setStrictMode}
                thumbColor={Platform.OS === 'ios' ? '#FFFFFF' : strictMode ? '#FF6B35' : '#C7C7CC'}
                trackColor={{ false: '#E5E5E7', true: '#FF6B35' }}
              />
            </View>
          </View>
        </View>

        <View style={styles.allergensSection}>
          <View style={styles.sectionHeaderContainer}>
            <Text style={styles.sectionHeader}>My Allergens</Text>
            <TouchableOpacity style={styles.addButton}>
              <Plus size={20} color="#FF6B35" />
              <Text style={styles.addButtonText}>Add Allergen</Text>
            </TouchableOpacity>
          </View>
          
          {allergens.map(renderAllergenCard)}
        </View>

        <View style={styles.resourcesSection}>
          <Text style={styles.sectionHeader}>Resources</Text>
          <TouchableOpacity style={styles.resourceItem}>
            <BookOpen size={20} color="#8E8E93" />
            <Text style={styles.resourceText}>Allergen Education Guide</Text>
            <ChevronRight size={16} color="#C7C7CC" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.resourceItem}>
            <Shield size={20} color="#8E8E93" />
            <Text style={styles.resourceText}>Emergency Action Plan</Text>
            <ChevronRight size={16} color="#C7C7CC" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E7',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Playfair-Bold',
    color: '#1D1D1F',
  },
  settingsButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1D1D1F',
  },
  summaryStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },
  summaryLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#8E8E93',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1D1D1F',
  },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E5E5E7',
    marginHorizontal: 16,
  },
  settingsSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1D1D1F',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  settingsCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  settingDetails: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1D1D1F',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#8E8E93',
  },
  settingDivider: {
    height: 1,
    backgroundColor: '#F2F2F7',
    marginLeft: 48,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  addButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FF6B35',
  },
  allergensSection: {
    marginBottom: 24,
  },
  allergenCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  allergenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  allergenInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  allergenIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  allergenDetails: {
    flex: 1,
  },
  allergenName: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#1D1D1F',
    marginBottom: 2,
  },
  allergenDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#8E8E93',
    marginBottom: 6,
  },
  severityBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  severityText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  allergenExpanded: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  sourcesSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1D1D1F',
    marginBottom: 8,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  sourceTag: {
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  sourceText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#8E8E93',
  },
  alternativesSection: {
    marginBottom: 0,
  },
  alternativeTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  alternativeText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  resourcesSection: {
    marginBottom: 40,
  },
  resourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 8,
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  resourceText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1D1D1F',
    flex: 1,
  },
});