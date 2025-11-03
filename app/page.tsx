"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpIcon, ArrowDownIcon, TrendingUp, Database, Activity, Clock, Target, Zap, BarChart3 } from "lucide-react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Line,
  LineChart as RechartsLineChart,
  Pie,
  PieChart as RechartsPieChart,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"

// Mock data for retention trends
const retentionData = [
  { month: "Jan", rate: 72, target: 75 },
  { month: "Feb", rate: 74, target: 75 },
  { month: "Mar", rate: 76, target: 75 },
  { month: "Apr", rate: 78, target: 75 },
  { month: "May", rate: 81, target: 75 },
  { month: "Jun", rate: 85, target: 75 },
]

// Mock data for customer segments
const segmentData = [
  { name: "High Value", value: 28, color: "#3b82f6" },
  { name: "At Risk", value: 18, color: "#ef4444" },
  { name: "Active", value: 42, color: "#10b981" },
  { name: "Dormant", value: 12, color: "#6b7280" },
]

// Mock data for engagement metrics
const engagementData = [
  { day: "Mon", sessions: 12400, interactions: 8200 },
  { day: "Tue", sessions: 13200, interactions: 9100 },
  { day: "Wed", sessions: 11800, interactions: 7800 },
  { day: "Thu", sessions: 14100, interactions: 9800 },
  { day: "Fri", sessions: 15300, interactions: 10500 },
  { day: "Sat", sessions: 9800, interactions: 6200 },
  { day: "Sun", sessions: 8900, interactions: 5800 },
]

// Mock data for ETL pipeline status
const pipelineData = [
  { name: "Customer Data", status: "completed", runtime: "2.3m", improvement: "45%" },
  { name: "Interaction Events", status: "completed", runtime: "1.8m", improvement: "48%" },
  { name: "Behavioral Aggregation", status: "running", runtime: "0.9m", improvement: "42%" },
  { name: "Retention Analysis", status: "queued", runtime: "-", improvement: "-" },
]

// Mock data for cohort analysis
const cohortData = [
  { cohort: "Week 1", retention: 100, week2: 85, week3: 72, week4: 68 },
  { cohort: "Week 2", retention: 100, week2: 88, week3: 76, week4: 71 },
  { cohort: "Week 3", retention: 100, week2: 90, week3: 79, week4: 74 },
  { cohort: "Week 4", retention: 100, week2: 92, week3: 82, week4: 78 },
]

export default function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState("7d")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Customer Analytics</h1>
              <p className="text-sm text-muted-foreground mt-1">Behavior & Retention Strategy Dashboard</p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-2 bg-secondary text-secondary-foreground rounded-md text-sm border border-border"
              >
                <option value="24h">Last 24 hours</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
              <Button variant="outline" size="sm">
                <Clock className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Retention Rate</CardTitle>
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">85%</div>
              <div className="flex items-center mt-2 text-sm">
                <ArrowUpIcon className="w-4 h-4 text-emerald-500 mr-1" />
                <span className="text-emerald-500 font-medium">+18%</span>
                <span className="text-muted-foreground ml-2">vs baseline</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Interactions</CardTitle>
                <Activity className="w-4 h-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">124.5K</div>
              <div className="flex items-center mt-2 text-sm">
                <ArrowUpIcon className="w-4 h-4 text-emerald-500 mr-1" />
                <span className="text-emerald-500 font-medium">+12.3%</span>
                <span className="text-muted-foreground ml-2">this week</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">ETL Performance</CardTitle>
                <Zap className="w-4 h-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">-45%</div>
              <div className="flex items-center mt-2 text-sm">
                <ArrowDownIcon className="w-4 h-4 text-emerald-500 mr-1" />
                <span className="text-emerald-500 font-medium">Processing time</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Stakeholder Visibility</CardTitle>
                <Target className="w-4 h-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">+40%</div>
              <div className="flex items-center mt-2 text-sm">
                <ArrowUpIcon className="w-4 h-4 text-emerald-500 mr-1" />
                <span className="text-emerald-500 font-medium">Improved</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-muted">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="segments">Segments</TabsTrigger>
            <TabsTrigger value="pipeline">ETL Pipeline</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Retention Trend */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Retention Trend</CardTitle>
                  <CardDescription className="text-muted-foreground">Monthly retention rate vs target</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={retentionData}>
                      <defs>
                        <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px" }}
                        labelStyle={{ color: "#f3f4f6" }}
                      />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="rate"
                        stroke="#3b82f6"
                        fillOpacity={1}
                        fill="url(#colorRate)"
                        name="Retention Rate %"
                      />
                      <Line type="monotone" dataKey="target" stroke="#ef4444" strokeDasharray="5 5" name="Target %" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Customer Segments */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Customer Segments</CardTitle>
                  <CardDescription className="text-muted-foreground">Behavioral segmentation breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={segmentData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {segmentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px" }}
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Engagement Metrics */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Weekly Engagement Metrics</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Sessions and interactions over the past week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="day" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px" }}
                      labelStyle={{ color: "#f3f4f6" }}
                    />
                    <Legend />
                    <Bar dataKey="sessions" fill="#3b82f6" name="Sessions" />
                    <Bar dataKey="interactions" fill="#10b981" name="Interactions" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Cohort Analysis */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Cohort Retention Analysis</CardTitle>
                <CardDescription className="text-muted-foreground">Week-over-week retention by cohort</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsLineChart data={cohortData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="cohort" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "8px" }}
                      labelStyle={{ color: "#f3f4f6" }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="retention" stroke="#3b82f6" name="Week 1" />
                    <Line type="monotone" dataKey="week2" stroke="#10b981" name="Week 2" />
                    <Line type="monotone" dataKey="week3" stroke="#f59e0b" name="Week 3" />
                    <Line type="monotone" dataKey="week4" stroke="#ef4444" name="Week 4" />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Segments Tab */}
          <TabsContent value="segments" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {segmentData.map((segment) => (
                <Card key={segment.name} className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground flex items-center justify-between">
                      {segment.name}
                      <Badge style={{ backgroundColor: segment.color }} className="text-white">
                        {segment.value}%
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Avg. Sessions</span>
                        <span className="text-foreground font-medium">
                          {segment.name === "High Value"
                            ? "24.5"
                            : segment.name === "Active"
                              ? "12.3"
                              : segment.name === "At Risk"
                                ? "3.2"
                                : "0.8"}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Churn Risk</span>
                        <span className="text-foreground font-medium">
                          {segment.name === "High Value"
                            ? "Low"
                            : segment.name === "Active"
                              ? "Low"
                              : segment.name === "At Risk"
                                ? "High"
                                : "Critical"}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">LTV</span>
                        <span className="text-foreground font-medium">
                          {segment.name === "High Value"
                            ? "$2,450"
                            : segment.name === "Active"
                              ? "$890"
                              : segment.name === "At Risk"
                                ? "$320"
                                : "$120"}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Segment Recommendations</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Personalized retention strategies by segment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-secondary rounded-lg border border-border">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                      <div>
                        <h4 className="font-medium text-foreground mb-1">High Value Customers</h4>
                        <p className="text-sm text-muted-foreground">
                          Implement VIP loyalty program with exclusive benefits. Focus on personalized experiences and
                          premium support.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg border border-border">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-red-500 mt-2" />
                      <div>
                        <h4 className="font-medium text-foreground mb-1">At Risk Customers</h4>
                        <p className="text-sm text-muted-foreground">
                          Deploy win-back campaigns with targeted incentives. Increase touchpoints and gather feedback
                          on pain points.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg border border-border">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2" />
                      <div>
                        <h4 className="font-medium text-foreground mb-1">Active Customers</h4>
                        <p className="text-sm text-muted-foreground">
                          Nurture with educational content and feature highlights. Encourage referrals and community
                          engagement.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg border border-border">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-gray-500 mt-2" />
                      <div>
                        <h4 className="font-medium text-foreground mb-1">Dormant Customers</h4>
                        <p className="text-sm text-muted-foreground">
                          Re-engagement campaign with special offers. Highlight new features and improvements since last
                          interaction.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ETL Pipeline Tab */}
          <TabsContent value="pipeline" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Data Pipeline Status</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Automated ETL workflows and performance metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pipelineData.map((pipeline) => (
                    <div
                      key={pipeline.name}
                      className="flex items-center justify-between p-4 bg-secondary rounded-lg border border-border"
                    >
                      <div className="flex items-center gap-4">
                        <Database className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <h4 className="font-medium text-foreground">{pipeline.name}</h4>
                          <p className="text-sm text-muted-foreground">Runtime: {pipeline.runtime}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        {pipeline.improvement !== "-" && (
                          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                            -{pipeline.improvement} faster
                          </Badge>
                        )}
                        <Badge
                          variant={
                            pipeline.status === "completed"
                              ? "default"
                              : pipeline.status === "running"
                                ? "secondary"
                                : "outline"
                          }
                          className={
                            pipeline.status === "completed"
                              ? "bg-emerald-500 text-white"
                              : pipeline.status === "running"
                                ? "bg-blue-500 text-white"
                                : "bg-muted text-muted-foreground"
                          }
                        >
                          {pipeline.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Data Volume</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">124.5K</div>
                  <p className="text-sm text-muted-foreground mt-2">Daily interactions processed</p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Automation Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">100%</div>
                  <p className="text-sm text-muted-foreground mt-2">Zero manual intervention</p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Avg. Latency</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">1.8m</div>
                  <p className="text-sm text-muted-foreground mt-2">End-to-end processing</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Insights Tab */}
          <TabsContent value="insights" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Key Insights & Recommendations</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Data-driven strategies for retention improvement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-6 bg-secondary rounded-lg border border-border">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-blue-500/10 rounded-lg">
                        <TrendingUp className="w-6 h-6 text-blue-500" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-2">Retention Improvement Success</h3>
                        <p className="text-muted-foreground mb-4">
                          Behavioral segmentation strategy has driven an 18% improvement in retention rate over the past
                          quarter. High-value customer segment shows 92% retention, exceeding target by 17 points.
                        </p>
                        <div className="flex gap-2">
                          <Badge className="bg-emerald-500 text-white">+18% Retention</Badge>
                          <Badge variant="outline" className="border-blue-500 text-blue-500">
                            High Impact
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-secondary rounded-lg border border-border">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-emerald-500/10 rounded-lg">
                        <Zap className="w-6 h-6 text-emerald-500" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-2">ETL Performance Optimization</h3>
                        <p className="text-muted-foreground mb-4">
                          Python-based ETL pipelines have reduced data processing time by 45%, enabling real-time
                          analytics. Parallel processing and optimized I/O operations handle 100K+ daily interactions
                          efficiently.
                        </p>
                        <div className="flex gap-2">
                          <Badge className="bg-emerald-500 text-white">-45% Processing Time</Badge>
                          <Badge variant="outline" className="border-emerald-500 text-emerald-500">
                            Automated
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-secondary rounded-lg border border-border">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-amber-500/10 rounded-lg">
                        <Target className="w-6 h-6 text-amber-500" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-2">At-Risk Customer Intervention</h3>
                        <p className="text-muted-foreground mb-4">
                          18% of customers identified as at-risk through behavioral analysis. Recommend immediate
                          deployment of personalized win-back campaigns and increased touchpoint frequency.
                        </p>
                        <div className="flex gap-2">
                          <Badge className="bg-amber-500 text-white">Action Required</Badge>
                          <Badge variant="outline" className="border-amber-500 text-amber-500">
                            18% At Risk
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-secondary rounded-lg border border-border">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-purple-500/10 rounded-lg">
                        <BarChart3 className="w-6 h-6 text-purple-500" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-2">Enhanced Stakeholder Visibility</h3>
                        <p className="text-muted-foreground mb-4">
                          Interactive dashboards have improved stakeholder visibility by 40%, reducing decision-making
                          time by 25%. Weekly automated reports enable proactive strategy adjustments.
                        </p>
                        <div className="flex gap-2">
                          <Badge className="bg-purple-500 text-white">+40% Visibility</Badge>
                          <Badge variant="outline" className="border-purple-500 text-purple-500">
                            Real-time Updates
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Success Metrics Summary</CardTitle>
                <CardDescription className="text-muted-foreground">MVP goals achievement status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-secondary rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Data Processing Time</span>
                      <Badge className="bg-emerald-500 text-white">Achieved</Badge>
                    </div>
                    <div className="text-2xl font-bold text-foreground">-45%</div>
                    <p className="text-xs text-muted-foreground mt-1">Target: -45%</p>
                  </div>

                  <div className="p-4 bg-secondary rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Retention Improvement</span>
                      <Badge className="bg-emerald-500 text-white">Achieved</Badge>
                    </div>
                    <div className="text-2xl font-bold text-foreground">+18%</div>
                    <p className="text-xs text-muted-foreground mt-1">Target: +18%</p>
                  </div>

                  <div className="p-4 bg-secondary rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Stakeholder Visibility</span>
                      <Badge className="bg-emerald-500 text-white">Achieved</Badge>
                    </div>
                    <div className="text-2xl font-bold text-foreground">+40%</div>
                    <p className="text-xs text-muted-foreground mt-1">Target: +40%</p>
                  </div>

                  <div className="p-4 bg-secondary rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Automation Rate</span>
                      <Badge className="bg-emerald-500 text-white">Achieved</Badge>
                    </div>
                    <div className="text-2xl font-bold text-foreground">100%</div>
                    <p className="text-xs text-muted-foreground mt-1">Target: 100%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
