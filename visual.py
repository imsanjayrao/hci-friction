import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Set default aesthetics for seaborn
sns.set(style="whitegrid", palette="pastel")

# Load your dataset from an Excel file
# Replace 'your_data.xlsx' with the path to your Excel file, and 'Sheet1' with the correct sheet name if necessary
df = pd.read_excel('Book1.xlsx', sheet_name='Sheet1')

# 1. Distribution of Videos Watched
plt.figure(figsize=(8, 6))
sns.histplot(df['Videos_Watched'], kde=True)
plt.title("Distribution of Videos Watched")
plt.xlabel("Number of Videos Watched")
plt.ylabel("Frequency")
plt.show()

# 2. Time Spent on Platform vs. Platform Usage Frequency
plt.figure(figsize=(8, 6))
sns.boxplot(x='Platform_Usage_Frequency', y='Time_Spent_on_Platform', data=df)
plt.title("Time Spent on Platform by Platform Usage Frequency")
plt.xlabel("Platform Usage Frequency")
plt.ylabel("Time Spent on Platform (seconds)")
plt.show()

# 3. Avg Time per Video vs. Frustration Level
plt.figure(figsize=(8, 6))
sns.boxplot(x='Frustration_Level', y='Avg_Time_Per_Video', data=df)
plt.title("Avg Time per Video by Frustration Level")
plt.xlabel("Frustration Level")
plt.ylabel("Average Time per Video (seconds)")
plt.show()

# 4. Unsuccessful Swipes and Scroll Direction Changes
plt.figure(figsize=(8, 6))
sns.scatterplot(x='Unsuccessful_Swipes', y='Scroll_Direction_Changes', data=df)
plt.title("Unsuccessful Swipes vs. Scroll Direction Changes")
plt.xlabel("Unsuccessful Swipes")
plt.ylabel("Scroll Direction Changes")
plt.show()

# 5. Displays of Quote Screen vs. Stopped After Quote
df['Displays_of_Quote_Screen'] = df['Displays_of_Quote_Screen'].astype(str)  # Convert to string for grouping
stopped_counts = df.groupby(['Displays_of_Quote_Screen', 'Stopped_After_Quote']).size().unstack()
stopped_counts.plot(kind='bar', stacked=True, figsize=(10, 6))
plt.title("Displays of Quote Screen vs. Stopped After Quote")
plt.xlabel("Displays of Quote Screen")
plt.ylabel("Count of Participants")
plt.legend(title="Stopped After Quote")
plt.show()

# 6. Reminder Appearance Count vs. Content Consumption Change
reminder_counts = df.groupby(['Reminder_Appearance_Count', 'Content_Consumption_Change']).size().unstack()
reminder_counts.plot(kind='bar', stacked=True, figsize=(10, 6))
plt.title("Reminder Appearance Count vs. Content Consumption Change")
plt.xlabel("Reminder Appearance Count")
plt.ylabel("Count of Participants")
plt.legend(title="Content Consumption Change")
plt.show()

# 7. Reaction to Quote by Perceived Disruption
reaction_disruption = df.groupby(['Reaction_to_Quote', 'Perceived_Disruption']).size().unstack()
plt.figure(figsize=(10, 8))
sns.heatmap(reaction_disruption, annot=True, fmt=".1f", cmap="Blues")  # Updated format for float values
plt.title("Reaction to Quote by Perceived Disruption")
plt.xlabel("Perceived Disruption")
plt.ylabel("Reaction to Quote")
plt.show()

# 8. Frustration Level by Platform Usage Frequency
plt.figure(figsize=(10, 6))
sns.countplot(x='Platform_Usage_Frequency', hue='Frustration_Level', data=df)
plt.title("Frustration Level by Platform Usage Frequency")
plt.xlabel("Platform Usage Frequency")
plt.ylabel("Count of Participants")
plt.legend(title="Frustration Level")
plt.show()

# 9. Perceived Usefulness by Content Consumption Change
usefulness_counts = df.groupby(['Perceived_Usefulness', 'Content_Consumption_Change']).size().unstack()
plt.figure(figsize=(12, 8))  # Increase figure size
usefulness_counts.plot(kind='bar', stacked=True, figsize=(12, 8))
plt.title("Perceived Usefulness by Content Consumption Change")
plt.xlabel("Perceived Usefulness")
plt.ylabel("Count of Participants")
plt.legend(title="Content Consumption Change")
plt.xticks(rotation=0, ha='right', fontsize=10)  # Rotate labels at a 45-degree angle, align right
plt.show()

# 10. Future Usage Intention by Frustration Level
plt.figure(figsize=(10, 6))
sns.countplot(x='Future_Usage_Intention', hue='Frustration_Level', data=df)
plt.title("Future Usage Intention by Frustration Level")
plt.xlabel("Future Usage Intention")
plt.ylabel("Count of Participants")
plt.legend(title="Frustration Level")
plt.show()
