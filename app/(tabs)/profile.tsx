import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Image,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Settings, Bell, Globe, Shield, BookOpen, Heart, Download, Share2, CircleHelp as HelpCircle, LogOut, ChevronRight, Star, Award, Clock, Users } from 'lucide-react-native';

const userStats = [
  { label: 'Recipes Saved', value: '127', icon: BookOpen },
  { label: 'Favorites', value: '43', icon: Heart },
  { label: 'Cooking Hours', value: '68', icon: Clock },
  { label: 'Shared Recipes', value: '12', icon: Share2 },
];

const achievements = [
  { id: 1, title: 'Master Chef', description: 'Saved 100+ recipes', icon: Award, earned: true },
  { id: 2, title: 'Healthy Eater', description: 'Saved 20+ healthy recipes', icon: Heart, earned: true },
  { id: 3, title: 'Global Cuisine', description: 'Tried 10+ cuisines', icon: Globe, earned: false },
  { id: 4, title: 'Safety First', description: 'Set up allergen preferences', icon: Shield, earned: true },
];

export default function ProfileScreen() {
  const [notifications, setNotifications] = useState(true);
  const [metricUnits, setMetricUnits] = useState(false);
  const [offlineMode, setOfflineMode] = useState(true);

  const renderStatCard = (stat: any) => (
    <View key={stat.label} style={styles.statCard}>
      <View style={styles.statIcon}>
        <stat.icon size={20} color="#FF6B35" />
      </View>
      <Text style={styles.statValue}>{stat.value}</Text>
      <Text style={styles.statLabel}>{stat.label}</Text>
    </View>
  );

  const renderAchievement = (achievement: any) => (
    <TouchableOpacity key={achievement.id} style={styles.achievementCard}>
      <View style={[
        styles.achievementIcon,
        { backgroundColor: achievement.earned ? '#E8F5E8' : '#F2F2F7' }
      ]}>
        <achievement.icon 
          size={24} 
          color={achievement.earned ? '#4CAF50' : '#C7C7CC'} 
        />
      </View>
      <View style={styles.achievementInfo}>
        <Text style={[
          styles.achievementTitle,
          { color: achievement.earned ? '#1D1D1F' : '#8E8E93' }
        ]}>
          {achievement.title}
        </Text>
        <Text style={styles.achievementDescription}>
          {achievement.description}
        </Text>
      </View>
      {achievement.earned && (
        <View style={styles.earnedBadge}>
          <Star size={16} color="#FFD700" fill="#FFD700" />
        </View>
      )}
    </TouchableOpacity>
  );

  const renderMenuItem = (icon: any, title: string, subtitle?: string, onPress?: () => void) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuItemLeft}>
        <View style={styles.menuIcon}>
          <icon size={20} color="#8E8E93" />
        </View>
        <View style={styles.menuContent}>
          <Text style={styles.menuTitle}>{title}</Text>
          {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      <ChevronRight size={16} color="#C7C7CC" />
    </TouchableOpacity>
  );

  const renderSettingItem = (icon: any, title: string, subtitle: string, value: boolean, onValueChange: (value: boolean) => void) => (
    <View style={styles.settingItem}>
      <View style={styles.settingLeft}>
        <View style={styles.settingIcon}>
          <icon size={20} color="#8E8E93" />
        </View>
        <View style={styles.settingContent}>
          <Text style={styles.settingTitle}>{title}</Text>
          <Text style={styles.settingSubtitle}>{subtitle}</Text>
        </View>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        thumbColor={Platform.OS === 'ios' ? '#FFFFFF' : value ? '#FF6B35' : '#C7C7CC'}
        trackColor={{ false: '#E5E5E7', true: '#FF6B35' }}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200' }}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.editButton}>
              <Settings size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.profileName}>Sarah Johnson</Text>
          <Text style={styles.profileEmail}>sarah.johnson@email.com</Text>
          <View style={styles.profileBadge}>
            <Star size={14} color="#FFD700" fill="#FFD700" />
            <Text style={styles.profileLevel}>Level 5 Chef</Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          {userStats.map(renderStatCard)}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementsContainer}>
            {achievements.map(renderAchievement)}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.settingsContainer}>
            {renderSettingItem(
              Bell, 
              'Notifications', 
              'Recipe alerts and updates', 
              notifications, 
              setNotifications
            )}
            {renderSettingItem(
              Globe, 
              'Metric Units', 
              'Use metric measurements', 
              metricUnits, 
              setMetricUnits
            )}
            {renderSettingItem(
              Download, 
              'Offline Mode', 
              'Download recipes for offline access', 
              offlineMode, 
              setOfflineMode
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.menuContainer}>
            {renderMenuItem(Shield, 'Allergen Settings', 'Manage your allergen preferences')}
            {renderMenuItem(BookOpen, 'Recipe History', 'View your cooking history')}
            {renderMenuItem(Users, 'Family Sharing', 'Share recipes with family')}
            {renderMenuItem(Star, 'Rate the App', 'Help us improve')}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <View style={styles.menuContainer}>
            {renderMenuItem(HelpCircle, 'Help & Support', 'Get help with the app')}
            {renderMenuItem(BookOpen, 'Privacy Policy', 'Review our privacy policy')}
            {renderMenuItem(Settings, 'Terms of Service', 'Read our terms')}
          </View>
        </View>

        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutButton}>
            <LogOut size={20} color="#FF3B30" />
            <Text style={styles.logoutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>Nourishing Kitchen v1.0.0</Text>
          <Text style={styles.appBuild}>Build 2024.1.1</Text>
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
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 32,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E7',
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 24,
    fontFamily: 'Playfair-Bold',
    color: '#1D1D1F',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#8E8E93',
    marginBottom: 12,
  },
  profileBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  profileLevel: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FF8F00',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF4F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1D1D1F',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#8E8E93',
    textAlign: 'center',
  },
  section: {
    marginTop: 24,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1D1D1F',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  achievementsContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 2,
  },
  achievementDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#8E8E93',
  },
  earnedBadge: {
    marginLeft: 12,
  },
  settingsContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1D1D1F',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#8E8E93',
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1D1D1F',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#8E8E93',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 16,
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FF3B30',
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  appVersion: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#8E8E93',
    marginBottom: 4,
  },
  appBuild: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#C7C7CC',
  },
});