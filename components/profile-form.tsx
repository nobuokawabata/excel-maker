"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download } from "lucide-react"
import ExcelJS from "exceljs"

interface ProfileData {
  lastName: string
  firstName: string
  lastNameKana: string
  firstNameKana: string
  gender: string
  birthDate: string
  email: string
  phone: string
  postalCode: string
  prefecture: string
  city: string
  address: string
  building: string
  occupation: string
  company: string
  notes: string
}

export default function ProfileForm() {
  const [formData, setFormData] = useState<ProfileData>({
    lastName: "",
    firstName: "",
    lastNameKana: "",
    firstNameKana: "",
    gender: "",
    birthDate: "",
    email: "",
    phone: "",
    postalCode: "",
    prefecture: "",
    city: "",
    address: "",
    building: "",
    occupation: "",
    company: "",
    notes: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const downloadExcel = async () => {
    try {
      // 1. Load template file
      const response = await fetch('/template.xlsx')
      if (!response.ok) {
        throw new Error('テンプレートファイルの読み込みに失敗しました')
      }
      const arrayBuffer = await response.arrayBuffer()
      
      // 2. Read template as workbook using ExcelJS
      const workbook = new ExcelJS.Workbook()
      await workbook.xlsx.load(arrayBuffer)
      
      // 3. Get "個人" (Personal) worksheet
      const personalSheet = workbook.getWorksheet('個人')
      if (!personalSheet) {
        throw new Error('「個人」シートが見つかりません')
      }
      
      // 4. Insert personal data into "個人" sheet
      personalSheet.getCell('B3').value = formData.lastName
      personalSheet.getCell('B4').value = formData.firstName
      personalSheet.getCell('B5').value = formData.lastNameKana
      personalSheet.getCell('B6').value = formData.firstNameKana
      personalSheet.getCell('B7').value = formData.gender
      personalSheet.getCell('B8').value = formData.birthDate
      personalSheet.getCell('B9').value = formData.email
      personalSheet.getCell('B10').value = formData.phone
      personalSheet.getCell('B11').value = formData.postalCode
      personalSheet.getCell('B12').value = formData.prefecture
      personalSheet.getCell('B13').value = formData.city
      personalSheet.getCell('B14').value = formData.address
      personalSheet.getCell('B15').value = formData.building
      
      // 5. Get "会社" (Company) worksheet
      const companySheet = workbook.getWorksheet('会社')
      if (!companySheet) {
        throw new Error('「会社」シートが見つかりません')
      }
      
      // 6. Insert company data into "会社" sheet
      companySheet.getCell('B3').value = formData.occupation
      companySheet.getCell('B4').value = formData.company
      companySheet.getCell('B5').value = formData.notes
      
      // 7. Generate Excel file as buffer
      const buffer = await workbook.xlsx.writeBuffer()
      
      // 8. Create blob and download
      const blob = new Blob([buffer], { 
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
      })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      const date = new Date().toISOString().split('T')[0]
      link.download = `profile_${date}.xlsx`
      link.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Excel生成エラー:', error)
      alert('Excelファイルの生成に失敗しました。')
    }
  }

  return (
    <Card className="border-4 border-primary shadow-none">
      <CardHeader className="bg-card border-b-4 border-primary">
        <CardTitle className="text-3xl font-bold text-primary uppercase tracking-wide">
          個人プロフィール入力フォーム
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8 space-y-8">
        {/* Basic Information Section */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-primary uppercase tracking-wide border-b-2 border-primary pb-2">
            基本情報
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-sm font-bold uppercase text-primary">
                姓
              </Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="border-2 border-primary bg-card text-foreground"
                placeholder="山田"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-sm font-bold uppercase text-primary">
                名
              </Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="border-2 border-primary bg-card text-foreground"
                placeholder="太郎"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastNameKana" className="text-sm font-bold uppercase text-primary">
                姓（カナ）
              </Label>
              <Input
                id="lastNameKana"
                name="lastNameKana"
                value={formData.lastNameKana}
                onChange={handleInputChange}
                className="border-2 border-primary bg-card text-foreground"
                placeholder="ヤマダ"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="firstNameKana" className="text-sm font-bold uppercase text-primary">
                名（カナ）
              </Label>
              <Input
                id="firstNameKana"
                name="firstNameKana"
                value={formData.firstNameKana}
                onChange={handleInputChange}
                className="border-2 border-primary bg-card text-foreground"
                placeholder="タロウ"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender" className="text-sm font-bold uppercase text-primary">
                性別
              </Label>
              <Select value={formData.gender} onValueChange={(value) => handleSelectChange("gender", value)}>
                <SelectTrigger className="border-2 border-primary bg-card text-foreground">
                  <SelectValue placeholder="選択してください" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">男性</SelectItem>
                  <SelectItem value="female">女性</SelectItem>
                  <SelectItem value="other">その他</SelectItem>
                  <SelectItem value="prefer-not-to-say">回答しない</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="birthDate" className="text-sm font-bold uppercase text-primary">
                生年月日
              </Label>
              <Input
                id="birthDate"
                name="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={handleInputChange}
                className="border-2 border-primary bg-card text-foreground"
              />
            </div>
          </div>
        </section>

        {/* Contact Information Section */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-primary uppercase tracking-wide border-b-2 border-primary pb-2">
            連絡先情報
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-bold uppercase text-primary">
                メールアドレス
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="border-2 border-primary bg-card text-foreground"
                placeholder="example@email.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-bold uppercase text-primary">
                電話番号
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                className="border-2 border-primary bg-card text-foreground"
                placeholder="090-1234-5678"
              />
            </div>
          </div>
        </section>

        {/* Address Section */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-primary uppercase tracking-wide border-b-2 border-primary pb-2">
            住所
          </h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="postalCode" className="text-sm font-bold uppercase text-primary">
                  郵便番号
                </Label>
                <Input
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className="border-2 border-primary bg-card text-foreground"
                  placeholder="123-4567"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="prefecture" className="text-sm font-bold uppercase text-primary">
                  都道府県
                </Label>
                <Input
                  id="prefecture"
                  name="prefecture"
                  value={formData.prefecture}
                  onChange={handleInputChange}
                  className="border-2 border-primary bg-card text-foreground"
                  placeholder="東京都"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="city" className="text-sm font-bold uppercase text-primary">
                市区町村
              </Label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="border-2 border-primary bg-card text-foreground"
                placeholder="渋谷区"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address" className="text-sm font-bold uppercase text-primary">
                番地
              </Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="border-2 border-primary bg-card text-foreground"
                placeholder="1-2-3"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="building" className="text-sm font-bold uppercase text-primary">
                建物名・部屋番号
              </Label>
              <Input
                id="building"
                name="building"
                value={formData.building}
                onChange={handleInputChange}
                className="border-2 border-primary bg-card text-foreground"
                placeholder="サンプルマンション 101号室"
              />
            </div>
          </div>
        </section>

        {/* Work Information Section */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-primary uppercase tracking-wide border-b-2 border-primary pb-2">
            職業情報
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="occupation" className="text-sm font-bold uppercase text-primary">
                職業
              </Label>
              <Input
                id="occupation"
                name="occupation"
                value={formData.occupation}
                onChange={handleInputChange}
                className="border-2 border-primary bg-card text-foreground"
                placeholder="会社員"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company" className="text-sm font-bold uppercase text-primary">
                会社名
              </Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="border-2 border-primary bg-card text-foreground"
                placeholder="株式会社サンプル"
              />
            </div>
          </div>
        </section>

        {/* Notes Section */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-primary uppercase tracking-wide border-b-2 border-primary pb-2">
            備考
          </h2>
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-sm font-bold uppercase text-primary">
              その他の情報
            </Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              className="border-2 border-primary bg-card text-foreground min-h-32"
              placeholder="その他、お伝えしたい情報があればご記入ください"
            />
          </div>
        </section>

        {/* Download Button */}
        <div className="flex justify-center pt-6">
          <Button
            onClick={downloadExcel}
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold uppercase tracking-wide px-12 py-6 text-lg border-0"
          >
            <Download className="mr-2 h-5 w-5" />
            Excelファイルをダウンロード
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
