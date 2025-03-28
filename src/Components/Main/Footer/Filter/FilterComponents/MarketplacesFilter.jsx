import React from "react";

function MarketplacesFilter({selectedMarketplaces, onChange}) {
    const handleMarketplaceButtonClick = (event) => {
        onChange(event); // Вызываем onChange, переданный из родителя
    };
    return (
        <>
            <span className="separator block opacity-[10%] h-px border-[white] border-[solid] border"></span>
            <h4 className="m-0 font-bold margin-0 opacity-50">Маркетплейсы</h4>
            <div className="filter-section marketplaces">
                <div className="marketplace-logos">
                    <button
                        className={`toggle-button marketplace-button ${selectedMarketplaces.includes("Wildberries") ? "active" : ""}`}
                        type="button"
                        value="Wildberries"
                        onClick={handleMarketplaceButtonClick}
                    >
                        <img src="./img/marketplace-logo/Wildberries.png" alt="Wildberries"/>
                        <span>Wildberries</span>
                    </button>
                    <button
                        className={`toggle-button marketplace-button ${selectedMarketplaces.includes("Yandex") ? "active" : ""}`}
                        type="button"
                        value="Yandex"
                        onClick={handleMarketplaceButtonClick}
                    >
                        <img src="./img/marketplace-logo/Yandex.png" alt="Я.Маркет"/>
                        <span>Я.Маркет</span>
                    </button>
                    <button
                        className={`toggle-button marketplace-button ${selectedMarketplaces.includes("Ozon") ? "active" : ""}`}
                        type="button"
                        value="Ozon"
                        onClick={handleMarketplaceButtonClick}
                    >
                        <img src="./img/marketplace-logo/Ozon.png" alt="Ozon"/>
                        <span>OZON</span>
                    </button>
                    <button
                        className={`toggle-button marketplace-button ${selectedMarketplaces.includes("Avito") ? "active" : ""}`}
                        type="button"
                        value="Avito"
                        onClick={handleMarketplaceButtonClick}
                    >
                        <img src="./img/marketplace-logo/Avito.png" alt="Avito"/>
                        <span>AVITO</span>
                    </button>
                    <button
                        className={`toggle-button marketplace-button ${selectedMarketplaces.includes("Boxberry") ? "active" : ""}`}
                        type="button"
                        value="Boxberry"
                        onClick={handleMarketplaceButtonClick}
                    >
                        <img src="./img/marketplace-logo/Boxberry.png" alt="Boxberry"/>
                        <span>Boxberry</span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default MarketplacesFilter;