<template>
    <div>
      hello
      <ContentAssessor :title="metaTitle" :titleWidth="titleWidth" :description="metaDescription" :url="url"
        :text="description" :locale="locale" :translations="translations" :resultFilter="assessorResultFilter" />

        <!-- <ContentAssessor1 :title="metaTitle" :description="metaDescription" /> -->

    </div>
  </template>
  
  <script setup lang="ts">
  import ContentAssessor1 from '~/components/TestComponent.vue'
  import ContentAssessor from '~/components/ContentAssessor.vue'
  
  const focusKeywords = [
      'Vitus System',
      'Tọa đàm',
      'Sức khỏe - Làm đẹp'
  ];
  const metaTitle = 'TỌA ĐÀM CHĂM SÓC SỨC KHỎE - LÀM ĐẸP VÀ RA MẮT SẢN PHẨM CHIẾN LƯỢC HỨA HẸN SẼ TRỞ THÀNH SỰ KIỆN BÙNG NỔ TRONG THÁNG 7 CỦA VITUS SYSTEM';
  const metaDescription = 'Ngày 13/07/2023 tới đây, tại New Day Palace, 85 Lê Lợi - Nguyễn Trãi - Hà Đông - Hà Nội, Vitus System hân hạnh tổ chức sự kiện “Tọa đàm Chăm sóc sức khỏe - làm đẹp và ra mắt sản phẩm chiến lược”.';
  const url = 'page/1';
  const description = `<h1 style="line-height: 1.4;">...</h1>`;  // Nội dung description
  const titleWidth = 0;
  const titleLengthPercent = 0;
  const descriptionLengthPercent = 0;
  const translations = null;
  const locale = 'en_US';
  const localeOptions = [
      { text: 'en_US', value: 'en_US' },
      { text: 'fa_IR', value: 'fa_IR' }
  ];

  function assessorResultFilter(value:any) {
    return value
  }



  </script>
  